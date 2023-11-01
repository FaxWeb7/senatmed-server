require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');  
const transporter = require('./helpers/transporter');

const app = express();
app.set('view engine');  

app.listen(process.env.PORT || 5000,  (error) => {
  error ? console.log(error) : console.log(`Listening port ${process.env.PORT || 5000}`);
}); 

app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); 
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
