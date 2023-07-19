const {Pool} = require('pg')
const bcrypt = require('bcryptjs')
const { error } = require('winston')
const {DB_URL} = process.env
const pool = new Pool({
    connectionString: DB_URL
})

module.exports = {
   
    addNewStudent: async (req, res) => {
        let { firstName, lastName, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
    
        let newSudent = await pool.query(
          `INSERT INTO students 
          (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)
          returning students.*
          `,
          [firstName, lastName, email, hash],
          (err, results) => {
            if (err) throw err;
            res.status(200).json(results.rows);
          }
        );
      }
}