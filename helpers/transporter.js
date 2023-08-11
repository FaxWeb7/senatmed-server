const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    service: 'gmail',
    port: 465,
    authentication: 'plain',
    enable_starttls_auto: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  }
)

module.exports = transporter;