const express = require('express')
const bodyParser = require('body-parser')

const EmailRouter = require('./routers/EmailRouter.js')

const app = express()

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/', EmailRouter)

app.listen(3000)


/************ Worker: start ***************/
const nodemailer = require('nodemailer');
const transportData = {
    service: 'gmail',
    secure: false,
    port: 5432,
    secure: false,
    auth: {
        type: "login",
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
}


const kue = require('kue')
const queue = kue.createQueue()
kue.app.listen( 3001 )

queue.process('email-service', function (job, done) {

    nodemailer.createTestAccount((err, account) => {
        const transporter = nodemailer.createTransport(transportData);
        const mailOptions = job.data

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                done(new Error('invalid to address'))
            }

            res.send('Success')
            done()
        });
    });
});
