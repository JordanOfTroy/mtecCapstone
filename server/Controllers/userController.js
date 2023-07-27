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
        `INSERT INTO users 
        (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)
        returning users.*
        `,
        [firstName, lastName, email, hash],
        (err, results) => {
          if (err) console.log(err)
          if (err) throw err;
          console.log(results.rows[0])
          res.status(200).json(results.rows[0]);
        }
      );
    }, 

    addNewAdmin: async (req, res) => {
      let { firstName, lastName, email, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      let newAdmin = await pool.query(
        `INSERT INTO users 
        (is_admin, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)
        returning users.*
        `,
        ['true', firstName, lastName, email, hash],
        (err, results) => {
          if (err) throw err;
          res.status(200).json(results.rows);
        }
      );
    },

    getAllStudents: (req, res) => {
      // console.log(`~~~~~~~~`)
      // console.log(req.auth)
      // console.log(`~~~~~~~~`)
      let {is_admin} = req.auth
      if (is_admin) {
        pool.query(`
          select (id, first_name, last_name, email) from users
          where is_admin = 'false'
        `, (err, results) => {
          if (err) throw err
          console.log(results.rows)
          res.status(200).json(results.rows)
        })
      }
    }, 

    getAllAdmins: (req, res) => {
      pool.query(`
        select (id, first_name, last_name, email) from users
        where is_admin = 'true'
      `, (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
      })
    },

    getAdminById: (req, res) => {
      let {id} = req.params
      pool.query(`select * from users where id = ${id}`, (err, results) => {
          if (err) throw err
          res.status(200).json(results.rows)
      })
    },

    updateAdmin: async (req, res) => {
      let {firstName, lastName, email} = req.body
      let {id} = req.params
      let updatedAdmin = await pool.query(`
          update users
          set first_name=$1, last_name=$2, email=$3
          where id = $4
          returning users.*;
      `, [firstName, lastName, email, id],
      (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
      })
    },

    updateStudent: async (req, res) => {
      let {firstName, lastName, email} = req.body
      let {id} = req.params
      let updatedAdmin = await pool.query(`
          update users
          set first_name=$1, last_name=$2, email=$3
          where id = $4
          returning users.*;
      `, [firstName, lastName, email, id],
      (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
      })
    }

}