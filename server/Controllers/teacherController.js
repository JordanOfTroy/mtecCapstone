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
    }
}