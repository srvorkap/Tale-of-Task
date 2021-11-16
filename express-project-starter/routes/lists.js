const express = require('express')
const { csrfProtection, asyncHandler } = require('./utils')
const { Task, List } = require('../db/models')
const { check, validationResult } = require('express-validator')

const router = express.Router()

const userValidators = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a list name')
        .isLength({ max: 50 })
        .withMessage('List name must not exceed 50 characters')
]

router.post('/lists', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
    const { name, userId } = req.body;
    const list = List.build({
        name,
        userId
    })
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await list.save()
    }
}))
