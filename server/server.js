const express = require("express");
const {expressjwt} = require('express-jwt')
const path = require('path')
const morgan = require('morgan')
const winston = require('winston')
// const helment = require('helmet')
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
const registrationCTRL = require('./Controllers/registrationController')



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// https://helmetjs.github.io/
// app.use(helmet.contentSecurityPolicy())


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
app.get('/api/myCourses/:id', auth, courseCTRL.getCoursesByStudent)
app.get('/api/courses/:id', courseCTRL.getCourseById)
app.get('/api/courses/teacher/:id', courseCTRL.getCoursesByTeacher)
app.get('/api/admins', userCTRL.getAllAdmins)
app.get('/api/admins/:id', userCTRL.getAdminById)
app.get('/api/students', auth, userCTRL.getAllStudents)
app.get('/api/student/:studentId', auth, userCTRL.getStudent)
app.get('/api/getMyStudents', auth, userCTRL.getMyStudents)
app.get('/api/user', auth, userCTRL.getUser)
app.get('/api/availableCourses/:studentId', courseCTRL.getAvailableCourses)

app.put('/api/courses', auth, courseCTRL.updateCourse)
app.put('/api/user', auth, userCTRL.updateUser) 
app.put('/api/joinCourse', auth, registrationCTRL.joinCourse)
app.put('/api/dropCourse', auth, registrationCTRL.dropCourse)

app.post('/api/courses', auth, courseCTRL.addNewCourse)
app.post('/api/newAdmin',auth, userCTRL.addNewAdmin)
app.post('/api/newStudent',auth, userCTRL.addNewStudent)
app.post('/api/login', loginCTRL.handleLogin)
app.post('/api/searchCourses', courseCTRL.searchAllCourses)

app.delete('/api/user/:id', auth, userCTRL.removeUser) // add auth
app.delete('/api/courses/:id', auth, courseCTRL.removeCourse)






app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

