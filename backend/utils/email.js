const nodemailer = require('nodemailer')

const sendEmail =async options => {
    var transport = {
        host:  process.env.MAIL_HOST,
        port:  process.env.MAIL_PORT,
        auth: {
          user:  process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
    };
    
    const transporter = nodemailer.createTransport(transport);

    const message = {
        from:`${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL} >`,
        to:options.email,
        subject: options.subject,
        text: options.message
    }
    transporter.sendMail(message);

}

module.exports= sendEmail