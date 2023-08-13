const {Pool} = require('pg')
const {DB_URL} = process.env
const pool = new Pool({
    connectionString: DB_URL
})

module.exports = {
    getAllCourses: (req, res) => {
        pool.query(`
        select courses.id, teacher_id, title, course_code, credit_hours, tuition,
        description, capacity, days_of_week, start_time, end_time, room_number,
        first_name, last_name from courses
        join users on courses.teacher_id = users.id
        `, (err, results) => {
            if (err) throw err
            for (let row of results.rows) {
                console.log(JSON.stringify(row))
            }
            res.status(200).json(results.rows)
        })
    },

    searchAllCourses: async (req, res) => {
        let {term} = req.body
        try {
            let searchedCourses = await pool.query(
                `
                select courses.id, teacher_id, title, course_code, credit_hours, tuition,
                description, capacity, days_of_week, start_time, end_time, room_number,
                first_name, last_name from courses
                join users on courses.teacher_id = users.id
                WHERE LOWER(title) LIKE '%'||LOWER($1)||'%'
                `,
                [term]
            )
            res.status(200).json(searchedCourses.rows)
        } catch (err) {
            console.log(`!!!!!!!!!!!!!!!`)
            console.log(err)
            console.log(`!!!!!!!!!!!!!!!`)
        }
        
    },

    getCourseById: (req, res) => {
        let {id} = req.params
        pool.query(`select * from courses where id = ${id}`, (err, results) => {
            if (err)throw err
            res.status(200).json(results.rows)
        })
    },

    getCoursesByTeacher: (req, res) => {
        let {id} = req.params
        pool.query(`select * from courses where teacher_id = ${id}`, (err, results) => {
            if (err) throw err
            for (let row of results.rows) {
                console.log(JSON.stringify(row))
            }
            res.status(200).json(results.rows)
        })
    },

    getCoursesByStudent: async (req, res) => {
        let id = req.auth.is_admin ? req.params.id : req.auth.id
        console.log(id)
        let studentCourses = await pool.query(`
        SELECT courses.id, title, course_code, credit_hours, tuition, description, days_of_week, start_time, end_time, room_number
        FROM courses
        JOIN students_courses ON courses.id = students_courses.course_id
        JOIN users ON students_courses.student_id = users.id
        WHERE users.id = $1;
        `,
        [id],
        (err, results) => {
            if (err) throw err
            res.status(200).json(results.rows)
        })
    },

    getCoursesImTeaching: async (req, res) => {
        let {id} = req.auth
        let courses = await pool.query(`
        SELECT courses.*
        FROM courses
        JOIN users ON courses.teacher_id = users.id
        WHERE users.id = $1;
        `,
        [id],
        (err, results) => {
            if (err) throw err
            res.status(200).json(results.rows)
        })
    },

    updateCourse: async (req, res) => {
        let {courseId, title, description, course_code, start_time, end_time, credit_hours, teacher_id, capacity, days_of_week, room_number} = req.body
        let {is_admin} = req.auth
        if (is_admin) {
            try {
                let updatedCourse = await pool.query(
                `
                UPDATE courses
                SET title=$2, description=$3, course_code=$4, start_time=$5, end_time=$6, credit_hours=$7, teacher_id=$8, capacity=$9, days_of_week=$10, room_number=$11
                WHERE id=$1
                `,
                [courseId, title, description, course_code, start_time, end_time, credit_hours, teacher_id, capacity, days_of_week, room_number]
                )
                res.status(200).json('course has been edited')
            } catch (err) {
                console.log('SERVER ERROR:', err)
            }
        }
    },

    addNewCourse: (req, res) => { //convert to async and send back results
        let {teacher_id, title, course_code, credit_hours, tuition, description,
            capacity, days_of_week, start_time, end_time, room_number} = req.body
        let {is_admin} = req.auth
        console.log(`~~~~~~~~`)
        console.log(req.body)
        console.log(req.auth)
        console.log(`~~~~~~~~`)
        if (is_admin) {
            pool.query(`
            INSERT INTO courses (teacher_id, title, course_code, credit_hours, tuition, description,
                capacity, enrolled, days_of_week, start_time, end_time, room_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            `,
            [teacher_id, title, course_code, credit_hours, tuition, description,
                capacity, 0, days_of_week, start_time, end_time, room_number],
            (err, results) => {
                if (err) throw err
                res.status(200).json('all good brah!')
            })
        } else {
            res.status(401).json('non-admin user')
        }
    },

    removeCourse: async (req, res) => {
        let {id} = req.params
        let {is_admin} = req.auth
        if (is_admin) {
            try {
                let removedCourse = await pool.query(
                    `
                    DELETE FROM courses
                    WHERE id = $1
                    `,
                    [id]
                )
                let removedStudents = await pool.query(
                    `
                    DELETE FROM students_courses
                    WHERE course_id = $1
                    `,
                    [id]
                )
                let updatedCourses = await pool.query(
                    `
                    select courses.id, teacher_id, title, course_code, credit_hours, tuition,
                    description, capacity, days_of_week, start_time, end_time, room_number,
                    first_name, last_name from courses
                    join users on courses.teacher_id = users.id
                    `
                )
                res.status(200).json(updatedCourses.rows)

            } catch (err) {
                console.log('SERVER ERROR: ', err)
            }
        }
            
    },

    //bug with query - will pull courses that the student is enrolled in IF other students are enrolled in the same course. SMH
    getAvailableCourses: async (req, res) => {
        const {studentId} = req.params
        try {
            let availableCourses = await pool.query(
                `
                SELECT DISTINCT courses.*
                FROM courses
                LEFT JOIN students_courses ON students_courses.course_id = courses.id
                AND students_courses.student_id = $1
                WHERE students_courses.student_id IS NULL
                ORDER BY courses.id;
                `,
                [studentId]
            )
            res.status(200).json(availableCourses.rows)
        } catch (err) {
            console.log('BACKEND ERROR:', err)
            res.status(400).json(err)
        }
    }

}