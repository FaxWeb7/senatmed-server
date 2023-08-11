require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');  
const nodemailer = require('nodemailer');
const chalk = require('chalk');
const transporter = require('./helpers/transporter');
const successMsg = chalk.bgKeyword('green').white.bold; 
const errorMsg = chalk.bgKeyword('white').red; 
const reqMsg = chalk.bgKeyword('purple').cyan.bold.underline; 

const app = express();
app.set('view engine');  


app.listen(process.env.PORT || 5000,  (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg(`Listening port ${process.env.PORT || 5000}`));
}); 

app.use(morgan(reqMsg(':method :url :status :res[content-length] - :response-time ms'))); 
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false})); 

app.post('/api/sendmail', (req, res) => {
  const { message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Заявка с сайта senatmed.ru',
    text: message
  }

  transporter.sendMail(mailOptions, (err, info) => err ? res.status(500) : res.status(200))
})
