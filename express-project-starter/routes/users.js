const express = require('express');
const router = express.Router();


const { csrfProtection, asyncHandler, bcrypt }= require('./utils')
const {User} = require('../db/models');



/* GET users listing. */
router.get('/signup', csrfProtection,  asyncHandler(async(req, res, next) => {
  const user = await User.build()
  res.render('user-signup', {
    csrfToken: req.csrfToken(),
    user,
    title: "Sign Up"
  });
}));

module.exports = router;
