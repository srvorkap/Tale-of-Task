const express = require('express')
const { csrfProtection, asyncHandler } = require('./utils')
const { Task, List } = require('../db/models')
const { check, validationResult } = require('express-validator')

const router = express.Router()

router.post('/lists', csrfProtection, asyncHandler(async (req, res, next) => {
    const { name, userId } = req.body;
    const list = List.build({
        name,
        userId
    })
}))
