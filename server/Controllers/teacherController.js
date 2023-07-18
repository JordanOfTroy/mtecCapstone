const {Pool} = require('pg')
const {DB_URL} = process.env
const pool = new Pool({
    connectionString: DB_URL
})

module.exports = {
    getAllTeachers: (req, res) => {
        pool.query('select * from teachers;', (err, results) => {
            if (err) throw err
            for (let row of results.rows) {
                console.log(JSON.stringify(row))
            }
            res.status(200).json(results.rows)
        })
    },

    getTeacherById: (req, res) => {
        let {id} = req.params
        pool.query(`select * from teachers where id = ${id}`, (err, results) => {
            if (err) throw err
            res.status(200).json(results.rows)
        })
    },

    updateTeacher: async (req, res) => {
        let {firstName, lastName} = req.body
        console.log(typeof firstName)
        let {id} = req.params
        let updatedTeacher = await pool.query(`
            update teachers
            set first_name = ${firstName}, last_name = ${lastName}
            where id = ${id}
            returning teachers.*;
        `)
        res.status(200).json(updatedTeacher.rows)
        // res.send('hi')
    }
}