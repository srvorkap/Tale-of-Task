const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler, bcrypt } = require('./utils')
const { User, List } = require('../db/models');

const { loginUser, logoutUser } = require('../auth');

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
    .withMessage('Email address must not exceed 255 characters')
    .isEmail()
    .withMessage('Email address must be a valid email')
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

const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please enter your email address')
    .isEmail()
    .withMessage('Email address must be a valid email'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please enter your password')
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
    await List.create({
      name: 'Inbox',
      userId: user.id
    })
    await List.create({
      name: 'Personal',
      userId: user.id
    })
    await List.create({
      name: 'Work',
      userId: user.id
    })
    loginUser(req, res, user);
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

router.get('/login', csrfProtection, asyncHandler(async (req, res) => {
  res.render('user-login', {
    title: 'Login',
    csrfToken: req.csrfToken()
  })
}));

router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let errors = [];

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({ where: { email } });
    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

      if (passwordMatch) {
        loginUser(req, res, user);
        return res.redirect('/');
      }
    }

    errors.push('Login failed with given credentials');

  } else {
    errors = validatorErrors.array().map(err => err.msg);
  }

  res.render('user-login', {
    title: 'Login',
    email,
    errors,
    csrfToken: req.csrfToken()
  })
}));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  req.session.save(() => res.redirect('/'))
})

module.exports = router;
