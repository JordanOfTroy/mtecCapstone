const express = require('express')
const morgan = require('morgan')
const winston = require('winston')
const app = express()
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'logfileExample.log'})
    ]
})

//One way of doing it:
// logger.stream = {
//     write: function(message, encoding){
//         logger.info(message);
//     }
// };

// app.use(require("morgan")("combined", { "stream": logger.stream }));
//----------------

app.use(express.urlencoded({extended:false}))
// app.use(mogan('dev')) // basic version

//How Thomas showed us, much easier. 
app.use(morgan('dev', {
    stream: {
        write: (message) => {
            logger.http(message.trim())
        }
    }
})) 

app.get('/', (req, res) => {
    logger.info('home page accessed')
    res.send('hello Morgan & Winston')
})

app.post('/addUser', (req, res) => {
    let {name} = req.body
    logger.info(`adding user: ${name}`)
    res.send(`the name is: ${name}`)
})

app.listen(3000, () => {
    console.log('server is listening on port 3000')
})