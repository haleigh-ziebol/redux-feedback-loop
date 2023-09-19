const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;


/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));


/** ---------- ROUTERS (make sure to define after middleware)---------- **/
const userRouter = require('./routes/user.router');
const feedbackRouter = require('./routes/feedback.router');
app.use('/user', userRouter);
app.use('/feedback', feedbackRouter);


/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});
