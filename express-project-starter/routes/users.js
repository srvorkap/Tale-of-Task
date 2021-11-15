const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler, bcrypt } = require('./utils')
const { User } = require('../db/models');

const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name')
    .isLength({ max: 50 })
    .withMessage('First name must not exceed 50 characters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name')
    .isLength({ max: 50 })
    .withMessage('Last name must not exceed 50 characters'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an email address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not exceed 255 characters')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a password')
    .isLength({ max: 50 })
    .withMessage('Password must not exceed 50 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not exceed 50 characters')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    })
]

router.get('/signup', csrfProtection, asyncHandler(async (req, res, next) => {
  const user = User.build()
  res.render('user-signup', {
    csrfToken: req.csrfToken(),
    user,
    title: "Sign Up"
  });
}));

router.post('/signup', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {

  const { firstName, lastName, email, password } = req.body;
  const user = User.build({ firstName, lastName, email });
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 11);
    user.hashedPassword = hashedPassword;
    user.level = 1;
    user.exp = 0;

    await user.save();
    // Login user here
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('user-signup', {
      title: 'Sign Up',
      firstName,
      lastName,
      email,
      csrfToken: req.csrfToken(),
      errors
    })
  }
}));

module.exports = router;
