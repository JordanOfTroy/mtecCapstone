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
                    let user = results.rows[0]
                    let {first_name, last_name, email, id, is_admin} = user
                    let token = jwt.sign({
                        first_name, last_name, email, id, is_admin
                    }, SECRET, {
                        algorithm: "HS256",
                        expiresIn: '1d'
                    })
                    
                    res.status(200).json({
                        token: token,
                        isAdmin: is_admin
                    })
                } else (
                    res.status(404).send('incorrect Password or Email')
                )
            } else {
                res.status(404).send('incorrect Password or Email')
            }
        })
    }

}