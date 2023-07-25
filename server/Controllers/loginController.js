const {Pool} = require('pg')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {DB_URL, SECRET} = process.env
const pool = new Pool({
    connectionString: DB_URL
})


module.exports = {
    handleLogin: async (req, res) => {
        let {email, password} = req.body
        let validPW
        let dbHash = await pool.query(`
            select * from users
            where email=$1
        `, [email],
        (err, results) => {
            if (err) throw err
            if (results.rows.length) {
                validPW = bcrypt.compareSync(password, results.rows[0].password)
                if (validPW) {
                    let token = jwt.sign({name: results.rows[0].email}, SECRET)
                    results.rows[0].jwtToken = token
                    console.log(results.rows[0])
                    res.status(200).json(results.rows[0])
                } else (
                    res.status(404).send('incorrect Password or Email')
                )
            } else {
                res.status(404).send('incorrect Password or Email')
            }
        })
    }
}