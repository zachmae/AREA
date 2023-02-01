const nodemailer = require("nodemailer");


var sendMail = (username, password, to, subject, message) => {

    const transporter = nodemailer.createTransport({
    host: "smtp.office365.com", // your SMTP host
    //  host: "smtp-mail.outlook.com", // your SMTP host
    port: 587, // your SMTP port
    secure: false, // use SSL
    auth: {
        user: username, // your SMTP username
        pass: password // your SMTP password
    }
    });

    const mailOptions = {
        from: username, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Email sent: ${info.response}`);
    }
    });
}

module.exports = {
    sendMail,
};