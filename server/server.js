const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//user auth
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

const pool = require('./modules/pool');

/** ---------- EXPRESS ROUTES ---------- **/

//POST new feedback as user
app.post('/feedback/',  (req, res) => {
    let newFeedback = req.body;
    console.log(newFeedback)
    console.log(`Adding feedback`, newFeedback);
    let queryText = `INSERT INTO "feedback" ("user_email", "feeling", "understanding", "support", "comments")
    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newFeedback.userEmail, newFeedback.feeling, newFeedback.understanding, newFeedback.support, newFeedback.comments])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new feedback`, error);
        res.sendStatus(500);
      });
});//end POST

//GET feedback submitted by user
app.get('/userfeedback/:userEmail',  (req, res) => {
  const userEmail = req.params.userEmail
  let queryText = `SELECT * FROM "feedback" WHERE "user_email" =$1;`;
  pool.query(queryText, [userEmail])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    });
}); //end GET


//GET whole list for admin
app.get('/feedbacklist',  (req, res) => {
  let queryText = `SELECT * FROM "feedback";`;
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    });
}); //end GET

//GET flagged feedback for admin
app.get('/flagged',  (req, res) => {
  let queryText = `SELECT COUNT(*) FILTER (WHERE "flagged")
  from "feedback";`;
  pool.query(queryText)
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(error => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    });
}); //end GET

// DELETE for admin
app.delete('/feedback/:id', (req, res) => {
  let id = req.params.id;
  let queryText = 'DELETE FROM "feedback" WHERE "id" = $1;';
  pool.query(queryText,[id] )
  .then((result) =>{
      res.sendStatus(200);
  })
  .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
  })
}); //end DELETE

// PUT for admin
app.put('/feedback/:id', (req, res) => {
  let id = req.params.id;
  let queryText = `UPDATE "feedback" SET "flagged" = NOT "flagged" WHERE "id" = $1;`;
  pool.query(queryText, [id]) //corresponds to $1
  .then((result) =>{
      res.sendStatus(200);
  })
  .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500)
  })
})// end PUT

//POST signup new user (from Ania Kubow)
app.post('/feedback/signup', async (req, res) => {
  const email = req.body.email;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt)
  let queryText = `INSERT INTO "users" ("email", "hashed_password")
  VALUES ($1, $2);`;
  try{
    const signUp = await pool.query(queryText, [email, hashedPassword]);
    if (signUp) {
      const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr'});
      res.json({ 'email': email, token })
    }
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({detail: err.detail})
    }
  }

});//end POST

//POST login
app.post('/feedback/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let queryText = `SELECT * FROM "users" where "email" = $1;`;
  try{
    const users = await pool.query(queryText, [email]);
    if (!users.rows.length) {
      return res.json({ detail: 'User does not exist!' })
    }
    const success = await bcrypt.compare(password, users.rows[0].hashed_password )
    const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr'});
    if (success) {
      res.json({ 'email': users.rows[0].email, token})
    }
    else {
      res.json({ detail: 'Login failed.' })
    }
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({detail: err.detail})
    }
  }

});//end POST


/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});
