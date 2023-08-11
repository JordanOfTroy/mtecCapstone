const {Pool} = require('pg')
const bcrypt = require('bcryptjs')
const { error } = require('winston')
const {DB_URL} = process.env
const pool = new Pool({
    connectionString: DB_URL
})

module.exports = {
  
  addNewStudent: async (req, res) => {
      let { firstName, lastName, email, password, telephone, address} = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      let newSudent = await pool.query(
        `INSERT INTO users 
        (first_name, last_name, email, password, telephone, address) VALUES ($1, $2, $3, $4, $5, $6)
        returning users.*
        `,
        [firstName, lastName, email, hash, telephone, address],
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
      let {is_admin} = req.auth
      if (is_admin) {
        pool.query(`
          select id, first_name, last_name, email from users
          where is_admin = 'false'
        `, (err, results) => {
          if (err) throw err
          // console.log(results.rows)
          res.status(200).json(results.rows)
        })
      } else {
        res.status(404).send('not an admin')
      }
    }, 

    getMyStudents: (req, res) => {
      let {is_admin, id} = req.auth
      if (is_admin) {
        pool.query(`
        select users.first_name, users.last_name, users.id, users.email, courses.title, courses.course_code from users
        join students_courses on users.id = students_courses.student_id
        join courses on students_courses.course_id = courses.id
        where courses.teacher_id = $1 
        order by users.id
        `,
        [id],
        (err, results) => {
          if (err) throw err
          res.status(200).json(results.rows)
        })
      }
    },


    getAllAdmins: (req, res) => {
      pool.query(`
        select id, first_name, last_name, email from users
        where is_admin = 'true'
      `, (err, results) => {
        if (err) throw err
        for (let row of results.rows) {
          console.log(JSON.stringify(row))
      }
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

    updateUser: async (req, res) => {
      console.log('UPDATING USER')
      let {firstName, lastName, email, telephone, address} = req.body
      let {id} = req.auth
      let updatedUser = await pool.query(`
          update users
          set first_name=$2, last_name=$3, email=$4, telephone=$5, address=$6
          where id = $1
          returning users.*;
      `, [id, firstName, lastName, email, telephone, address]
      )
      res.status(200).json(updatedUser.rows[0])
    },

    removeUser: async (req, res) => {
      let {id} = req.params
      let {is_admin} = req.auth
      if (is_admin) {
        try {
          let removedFromCourses = await pool.query(
            `
            DELETE FROM students_courses
            WHERE student_id = $1
            `,
            [id]
          )
          let removedUser = await pool.query(
            `
            DELETE FROM users
            WHERE id = $1
            `,
            [id]
          )
          if (removedUser.rows.length <= 0 && removedFromCourses.rows.length <= 0) {
            res.status(200).json('User has been successfully removed.')
          } else {
            res.status(400).send('there was a problem removing this user')
          }
        } catch (err) {
          console.log('BACKEND ERROR:', err)
        }
      }
    },

    getUser: async (req, res) =>{
      console.log('getting user')
      let {id} = req.auth
      let user = await pool.query(`
      SELECT first_name, last_name, is_admin, telephone, address, email from users
      WHERE id = $1
      `,
      [id])
      console.log(`-=-=-`)
      console.log(user)
      console.log(`-=-=-`)
      res.status(200).json(user.rows[0])
    },

    getStudent: async (req, res) => {
      const {studentId} = req.params
      const {is_admin} = req.auth
      
      if (is_admin) {
        try {
          let user = await pool.query (
            `
            SELECT id, first_name, last_name, email, telephone, address
            FROM users
            WHERE id = $1
            `,
            [studentId]
          )
          let userCourses = await pool.query(
            `
            Select courses.* from courses
            join students_courses on students_courses.course_id = courses.id
            where students_courses.student_id = $1
            `,
            [studentId]
          )
       
          if (user.rows.length > 0 && userCourses.rows.length > 0) {
            res.status(200).json({user: user.rows, courses: userCourses.rows})
          } else if (user.rows.length > 0 && userCourses.rows.length <= 0) {
            res.status(200).json({user: user.rows, courses: userCourses.rows})
          }

        } catch (err) {
          console.log('BACKEND ERROR:', err)
        }
      }
    }

}