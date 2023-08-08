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
join    users on courses.teacher_id = users.id
        `, (err, results) => {
            if (err) throw err
            for (let row of results.rows) {
                console.log(JSON.stringify(row))
            }
            res.status(200).json(results.rows)
        })
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
        console.log('the backend is fucking working')
        let {id} = req.auth
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
        SELECT title, course_code, credit_hours, tuition, description, days_of_week, start_time, end_time, room_number
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
        console.log(`~~~~~`)
        console.log(is_admin)
        req.body
        console.log(`~~~~~`)
        if (is_admin) {
            let updatedCourse = await pool.query(`
            UPDATE courses
            SET title=$2, description=$3, course_code=$4, start_time=$5, end_time=$6, credit_hours=$7, teacher_id=$8, capacity=$9, days_of_week=$10, room_number=$11
            WHERE id=$1
            RETURNING courses.*
            `, [courseId, title, description, course_code, start_time, end_time, credit_hours, teacher_id, capacity, days_of_week, room_number],
            (err, results) => {
                if (err) throw err
                console.log(results.rows)
                res.status(200).json(results.rows)
            })
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
            let updatedCourses = await pool.query(`
            DELETE FROM courses
            where id=$1
            `,
            [id],
            (err, results) => {
                if (err) throw err
                pool.query(`
                SELECT * from courses
                `, (err, results) => {
                    if (err) throw err
                    res.status(200).json(results.rows)
                })
            })
        } else {
            res.status(401).json('non-admin user')
        }
    }


}