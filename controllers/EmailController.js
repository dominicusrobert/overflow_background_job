'use strict';
const kue = require('kue')
const queue = kue.createQueue()

class EmailController {

    static sendEmail(req, res) {
        let emailAddressTarget = req.body.email

        var job = queue.create('email-service', {
            title: 'Send email',
            from: '"Overflow" <no-reply@overflow.com>',
            to: emailAddressTarget,
            subject: 'Registration Success',
            text: 'Congratulation, You have registered in overflow.dominicusrobert.com'
        })

        job.on('complete', function (result) {
            console.log('Job completed with data ', result)
        }).on('failed attempt', function (errorMessage, doneAttempts) {
            console.error('Job failed')
        }).on('failed', function (errorMessage) {
            console.error('Job failed')
        }).on('progress', function (progress, data) {
            console.error('\r  job #' + job.id + ' ' + progress + '% complete with data ', data);
        })
        
        job.save(
            (err) => {
                if (!err) {
                    console.log(job.id);
                    res.status(200).end();
                    return;
                }
                console.log(err);
                res.status(500).end();
            });
    }

}

module.exports = EmailController
