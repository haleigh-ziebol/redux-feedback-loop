const express = require('express');
const router = new express.Router();
const pool = require('../modules/pool');

//POST new feedback as user
router.post('/',  (req, res) => {
  let newFeedback = req.body;
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

//GET whole list for admin
router.get('/adminlist',  (req, res) => {
  let queryText = 'SELECT * from "feedback";';
  console.log('Fetching all feedback for admin')
  pool.query(queryText)
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log(`Error fetching feedback`, error);
    res.sendStatus(500);
  });
}); //end GET

//GET flagged feedback for admin
router.get('/flagged', (req, res) => {
  let queryText = `SELECT COUNT(*) FILTER (WHERE "flagged")
    from "feedback";`;
  console.log('fetching all flagged feedback for admin')
  pool.query(queryText)
  .then(result => {
    res.send(result.rows[0]);
  })
  .catch(error => {
    console.log(`Error fetching flagged feedback`, error);
    res.sendStatus(500);
  });
}); //end GET

//GET feedback submitted by user
router.get('/:userEmail', (req, res) => {
  const userEmail = req.params.userEmail;
  console.log('Fetching all users feedback')
  let queryText = `SELECT * FROM "feedback" WHERE "user_email" =$1;`;
  pool.query(queryText, [userEmail])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log(`Error fetching users feedback`, error);
    res.sendStatus(500);
  });
}); //end GET

// DELETE feedback by ID for admin
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let queryText = 'DELETE FROM "feedback" WHERE "id" = $1;';
  console.log('deleting feedback id', id)
  pool.query(queryText,[id] )
  .then((result) =>{
      res.sendStatus(200);
  })
  .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
  })
}); //end DELETE

// PUT to update flagged status by ID for admin
router.put('/:id', (req, res) => {
  let id = req.params.id;
  let queryText = `UPDATE "feedback" SET "flagged" = NOT "flagged" WHERE "id" = $1;`;
  console.log('updating feedback to flagged for id', id);
  pool.query(queryText, [id]) //corresponds to $1
  .then((result) =>{
      res.sendStatus(200);
  })
  .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500)
  })
})// end PUT


module.exports = router;