const express = require("express");
const {expressjwt} = require('express-jwt')
const path = require('path')
const morgan = require('morgan')
const winston = require('winston')
const PORT = process.env.PORT || 3001;
const app = express();
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'serverlog.log'
    })
  ]
})
const {
  DB_URL,
  EXT_DB_URL,
  DB_PW,
  SECRET
} = process.env
const auth = expressjwt({
  secret:SECRET,
  algorithms: ['HS256']
})
const courseCTRL = require('./Controllers/courseController')
const userCTRL = require('./Controllers/userController')
const loginCTRL = require('./Controllers/loginController')



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use(morgan('dev', {
  stream: {
    write: (message) => {
      logger.http(message.trim())
    }
  }
}))



//ENDMPOINTS
app.get('/api/courses', courseCTRL.getAllCourses)
app.get('/api/coursesImTeaching', auth, courseCTRL.getCoursesImTeaching)
app.get('/api/myCourses', auth, courseCTRL.getCoursesByStudent)
app.get('/api/courses/:id', courseCTRL.getCourseById)
app.get('/api/courses/teacher/:id', courseCTRL.getCoursesByTeacher)
app.put('/api/courses/:id', courseCTRL.updateCourse) 

app.get('/api/admins', userCTRL.getAllAdmins)
app.get('/api/admins/:id', userCTRL.getAdminById)
app.post('/api/newAdmin', userCTRL.addNewAdmin)
app.put('/api/admins/:id', userCTRL.updateAdmin)

app.get('/api/students', auth, userCTRL.getAllStudents)
app.get('/api/getMyStudents', auth, userCTRL.getMyStudents)
app.post('/api/newStudent', userCTRL.addNewStudent)
app.put('/api/students/:id', userCTRL.updateStudent)

app.post('/api/login', loginCTRL.handleLogin)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

