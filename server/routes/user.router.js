const express = require('express');
const router = new express.Router();
const pool = require('../modules/pool');

//user auth packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//POST signup new user (from Ania Kubow)
router.post('/signup', async (req, res) => {
  console.log(req.body)
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

//POST login (from Ania Kubow)
router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let queryText = `SELECT * FROM "users" where "email" = $1;`;
  try{
    const users = await pool.query(queryText, [email]);
    if (!users.rows.length) {
      return res.json({ detail: 'User does not exist!' })
    }
    const success = await bcrypt.compare(password, users.rows[0].hashed_password )
    const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr'}); //'secret' is a placeholder
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

module.exports = router;