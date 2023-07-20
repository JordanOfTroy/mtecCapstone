const express = require("express");
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
  DB_PW
} = process.env
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


// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

//ENDMPOINTS
app.get('/courses', courseCTRL.getAllCourses)
app.get('/courses/:id', courseCTRL.getCourseById)
app.get('/courses/teacher/:id', courseCTRL.getCoursesByTeacher)
app.put('/courses/:id', courseCTRL.updateCourse) 

app.get('/admins', userCTRL.getAllAdmins)
app.get('/admins/:id', userCTRL.getAdminById)
app.post('/newAdmin', userCTRL.addNewAdmin)
app.put('/admins/:id', userCTRL.updateAdmin)

app.get('/students', userCTRL.getAllStudents)
app.post('/newStudent', userCTRL.addNewStudent)
app.put('/students/:id', userCTRL.updateStudent)

app.post('/login', loginCTRL.handleLogin)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

