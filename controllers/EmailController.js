'use strict';
const nodemailer = require('nodemailer');
const transportData = {
    service: 'gmail',
    secure: false,
    port: 5432,
    secure: false,
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
}


class EmailController {

    static sendEmail(req, res) {
        nodemailer.createTestAccount((err, account) => {
            const transporter = nodemailer.createTransport(transportData);
            const mailOptions = {
                from: '"Overflow" <no-reply@overflow.com>', 
                to: req.body.email, 
                subject: 'Registration Success', 
                text: 'Congratulation, You have registered in overflow.dominicusrobert.com'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }

                res.send('Success')
                // console.log('Message sent: %s', JSON.stringify(info));
                // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        });
    }

}

module.exports = EmailController
