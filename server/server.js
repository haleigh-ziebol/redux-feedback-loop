const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//password encryption
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

const pool = require('./modules/pool');

/** ---------- EXPRESS ROUTES ---------- **/

//POST
app.post('/feedback',  (req, res) => {
    let newFeedback = req.body;
    console.log(`Adding feedback`, newFeedback);
    let queryText = `INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
    VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [newFeedback.feeling, newFeedback.understanding, newFeedback.support, newFeedback.comments])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new book`, error);
        res.sendStatus(500);
      });
});//end POST

//GET
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

//GET
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

// DELETE
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

// PUT
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


/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});

//**endpoints
// sign up
app.post('/signup', async(req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const signUp = await pool.query(`INSERT INTO "users" ("email", "hashed_password") VALUES($1, $2);`, [email, hashedPassword])
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
    res.json({ email, token })
  }
  catch(err) {
    console.error(err);
    if (err) {
      res.json({ detail: err.detail})
    }
  }
}) // end sign up

// login
app.post('/login', async(req, res) => {
  const { email, password } = req.body
  try {
    const users = await pool.query(`SELECT * FROM "users" where "email" =$1`, [email])
    if (!users.rows.length){
      return res.json({detail: 'User does not exist!'})
    }
    const success = await bcrypt.compare(password, users.rows[0].hashed_password)
    if(success) {
      res.json({email: users.rows[0].email, token})
      const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
    }
    else{
      return res.json({detail: 'Login failed.'})
    }
  }
  catch(err) {
    console.error(err)
  }
}) //end login
