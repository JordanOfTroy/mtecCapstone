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