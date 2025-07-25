const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    service : 'gmail',
    // host : "smtp.gmail.com",
    host: process.env.EMAIL_HOST,
    port: 587,
    secure : false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  transporter.verify((error, success) => {
  if (error) console.error('Transporter error:', error);
  else console.log('Transporter is ready:', success);
});

  // Option for sending email
  const options = {
    from:process.env.EMAIL_USER,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;

