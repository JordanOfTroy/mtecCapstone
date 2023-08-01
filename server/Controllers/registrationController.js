const {Pool} = require('pg')
const {DB_URL} = process.env
const pool = new Pool({
    connectionString: DB_URL
})

const createScheduleDay = (obj) => {
    console.log(`-=-=-=-=-=-`)
    console.log(obj)
    console.log(`-=-=-=-=-=-`)
    let {days_of_week, start_time, end_time} = obj

}

module.exports = {
    joinCourse: async (req, res) => { 
        // check for opening
        // check if already enrolled
        let {courseId} = req.body
        let {userId} = req.body // replace with req.auth
        let userCourses = await pool.query(`
        SELECT * FROM students_courses
        WHERE student_id = $1
        AND course_id = $2
        `,
        [userId, courseId])
        
        let courseEnrollment = await pool.query(`
        SELECT * FROM students_courses
        WHERE course_id = $1
        `,
        [courseId])
       
        if (userCourses.rows.length == 0 && courseEnrollment.rows.length == 0 ) {
            pool.query(`
            INSERT INTO students_courses (student_id, course_id)
            VALUES ($1, $2)
            `,
            [userId, courseId],
            (err, results) => {
                if (err) throw err
                res.status(200).json('enrolled')
            })
        } else {
            res.status(200).json('unable to enroll')
        }
    }
}






/*We'll probably want to filter the schedule and compare it to the incoming course.
                if the day is the same, do the times conflict? 

            [
                {
                    day: 'M',
                    blocks: [
                        {
                            start_time: '00:00',
                            end_time: '00:00'
                        },
                        {
                            start_time: '00:00',
                            end_time: '00:00'
                        }
                    ]
                },
                {
                    day: 'T',
                    blocks: [
                        {
                            start_time: '00:00',
                            end_time: '00:00'
                        },
                        {
                            start_time: '00:00',
                            end_time: '00:00'
                        },
                        {
                            start_time: '00:00',
                            end_time: '00:00'
                        }
                    ]
                },
            ]

            let doesFit = true
            if day m



joinCourse: (req, res) => { 
        // check for opening
        // check if already enrolled
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
            // console.log(results.rows)
            let {rows} = results
            let userSchedule = []
            rows.map(row => {
                // console.log(`~~~~~~~`)
                // console.log(row)
                // console.log(`~~~~~~~`)
                // createScheduleDay(row)
                let daysArr = row.days_of_week
                for (let i=0; i<daysArr.length; i++) {
                    let scheduleObj = {
                        day: daysArr[i],
                        start_time: row.start_time,
                        end_time: row.end_time
                    }
                    userSchedule.push(scheduleObj)
                }
            })
            console.log(userSchedule)
            res.status(200).json(userSchedule)
            
        })
    }




            */ 

    /**
     * joinCourse: (req, res) => { 
        // check for opening
        // check if already enrolled
        let {courseId} = req.body
        let {userId} = req.body // replace with req.auth
        let enrolledCourses = []
        let canEnroll = true
        pool.query(`
        select id as selectedId, enrolled, capacity
        from courses
        where id = $1
        `,
        [courseId],
        (err, results) => {
            if (err) { console.log('FETCHING ERROR:', err)}
            let {enrolled, capacity, selectedId} = results.rows[0]
            if (enrolled >= capacity) {
                res.status(200).json('class full')
            } else {
                pool.query(`
                select * 
                from courses
                join students_courses on courses.id = students_courses.course_id
                join users  on students_courses.student_id = users.id
                where users.id = $1
                `,
                [userId],
                async (err, results) => {
                    if (err) {console.log('FETCHING ERROR:', err)}
                    let enrolledCourses = results.rows
                    for (let enrolledCourse in enrolledCourses) {
                        console.log(`-=-=-=-`)
                        console.log(enrolledCourses[enrolledCourse])
                        console.log(`-=-=-=-`)
                        if (enrolledCourses[enrolledCourse].id === selectedId) {
                            console.log(selectedId)
                            console.log(canEnroll)
                            canEnroll = false
                            console.log(canEnroll)
                        }
                    }
                    if (canEnroll) {
                        let updatedCourses = await pool.query(`
                        insert into students_courses (student_id, course_id)
                        values ($1, $2)
                        `,
                        [userId, courseId],
                        (err, results) => {
                            if (err) {console.log('FETCHING ERROR:', err)}
                            res.status(200).json('enrolled successfully')
                        })
                    } else {
                        res.status(200).json('already enrolled')
                    }
                })
            }
        })
    }
     */