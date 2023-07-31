const {Pool} = require('pg')
const {DB_URL} = process.env
const pool = new Pool({
    connectionString: DB_URL
})

module.exports = {
    joinCourse: (req, res) => {
        let {courseId} = req.body
        let {userId} = req.body // replace with req.auth
        pool.query(`
        select course_code, days_of_week, start_time, end_time from courses
        join students_courses on courses.id = students_courses.course_id
        join users  on students_courses.student_id = users.id
        where users.id = $1  
        `,
        [userId],
        (err, results) => {
            if (err) throw err
            console.log(results.rows)
            
        })
    }
}