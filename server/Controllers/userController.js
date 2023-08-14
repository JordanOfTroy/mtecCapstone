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

      try {
        let newStudent = await pool.query(
          `INSERT INTO users 
          (first_name, last_name, email, password, telephone, address) VALUES ($1, $2, $3, $4, $5, $6)
          returning users.*
          `,
          [firstName, lastName, email, hash, telephone, address]
        )
        res.status(200).send(newStudent.rows[0])

      } catch(err) {
        console.log('BACKEND ERROR:', err)
        res.status(400).json(err)
      }
    }, 

    addNewAdmin: async (req, res) => {
      let { firstName, lastName, email, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      try {
        let newAdmin = await pool.query(
          `INSERT INTO users 
          (is_admin, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)
          returning users.*
          `,
          ['true', firstName, lastName, email, hash]
        )
        res.status(200).json(newAdmin.rows[0])
      } catch (err) {
        console.log('BACKEND ERROR', err)
        res.status(400).send(err)
      }
  
    },

    getAllStudents: async (req, res) => {
      let {is_admin} = req.auth
      if (is_admin) {
        try {
          let allStudents = await pool.query(`
            select id, first_name, last_name, email from users
            where is_admin = 'false'
            order by last_name
          `)
          res.status(200).json(allStudents.rows)
        } catch (err) {
          console.log('BACKEND ERROR:', err)
          res.status(400).json(err)
        }
      } else {
        res.status(404).send('not an admin')
      }
    }, 

    getMyStudents: async (req, res) => {
      let {is_admin, id} = req.auth
      if (is_admin) {
        try {
          let myStudents = await pool.query(
          `
          select users.first_name, users.last_name, users.id, users.email, courses.title, courses.course_code from users
          join students_courses on users.id = students_courses.student_id
          join courses on students_courses.course_id = courses.id
          where courses.teacher_id = $1 
          order by users.last_name
          `,
          [id]
          )
          res.status(200).json(myStudents.rows)
        } catch (err) {
          console.log('BACKEND ERROR:', err)
          res.status(400).json(err)
        }
      } else {
        res.status(404).send('not an admin')
      }
    },


    getAllAdmins: async (req, res) => {
      try {
        let admins = await pool.query(
        `
          select id, first_name, last_name, email from users
          where is_admin = 'true'
        `
        )
        res.status(200).json(admins.rows)
      } catch (err) {
        console.log('BACKEND ERROR:', err)
        res.status(400).json(err)
      }
    },

    getAdminById: async (req, res) => {
      let {id} = req.params
      try {
        let admin = await pool.query(
          `
          select * from users 
          where id = $1
          `,
          [id]
          )
          res.status(200).json(admin.rows)
      } catch (err) {
        console.log('BACKEND ERROR:', err)
        res.status(400).json(err)
      }
    },

    updateUser: async (req, res) => {
      console.log('UPDATING USER')
      let {firstName, lastName, email, telephone, address} = req.body
      let id = req.auth.is_admin ? req.body.id : req.auth.id
      try {
        let updatedUser = await pool.query(`
            update users
            set first_name=$2, last_name=$3, email=$4, telephone=$5, address=$6
            where id = $1
            returning users.*;
        `, [id, firstName, lastName, email, telephone, address]
        )
        res.status(200).json(updatedUser.rows[0])
      } catch (err) {
        console.log('BACKEND ERROR:', err)
        res.status(400).json(err)
      }
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
      try {
        let user = await pool.query(
        `
        SELECT first_name, last_name, is_admin, telephone, address, email from users
        WHERE id = $1
        `,
        [id]
        )
        res.status(200).json(user.rows[0])
      } catch (err) {
        console.log('BACKEND ERROR:', err)
        res.status(400).json(err)
      }
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