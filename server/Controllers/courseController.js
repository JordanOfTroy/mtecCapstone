const {Pool} = require('pg')
const {DB_URL} = process.env
const pool = new Pool({
    connectionString: DB_URL
})

module.exports = {
    getAllCourses: (req, res) => {
        pool.query('select * from courses;', (err, results) => {
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
        SELECT title, course_code, credit_hours, tuition, description, days_of_week, start_time, end_time, room_number
        FROM courses
        JOIN students_courses ON courses.id = students_courses.course_id
        JOIN users ON students_courses.student_id = users.id
        WHERE users.id = ${id};
        `, (err, results) => {
            if (err) throw err
            res.status(200).json(results.rows)
        })
    },

    updateCourse: async (req, res) => {
        let {id} = req.params
        let {description} = req.body
        let updatedCourse = await pool.query(`
            update courses
            set description = ${description}
            where id = ${id}
            returning courses.*;
        `)
        res.status(200).json(updatedCourse.rows)
    }
}