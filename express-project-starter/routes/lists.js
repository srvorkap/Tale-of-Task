const express = require('express')
const { csrfProtection, asyncHandler } = require('./utils')
const { User, List, Task } = require('../db/models')
const { check, validationResult } = require('express-validator')

const router = express.Router()

const userValidators = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a list name')
        .isLength({ max: 50 })
        .withMessage('List name must not exceed 50 characters')
]

//MAY NOT USE - how do we redirect to the inbox automatically?
router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const userId = req.session.auth.userId;
    let lists = await List.findAll({
        where: {
            userId
        }
    })
    JSON.stringify(lists)

    res.render('user-task-list', {
        lists,
        csrfToken: req.csrfToken()
    })
}))

router.post('/', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
    const { name, userId } = req.body;
    const list = List.build({
        name,
        userId
    })
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await list.save()
        res.locals.list = list;
        res.render('user-task-list')
    } else {
        const errors = validatorErrors.array().map(err => err.msg)
        res.render('user-task-list', {
            errors,
            csrfToken: req.csrfToken()
        })
    }
}))

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    const userId = req.session.auth.userId;
    const listId = req.url.slice('/')[2];
    //For Sidebar
    let lists = await List.findAll({
        where: {
            userId
        }
    })
    JSON.stringify(lists)

    //Set res.locals.list to currentList
    const currentList = await List.findByPk(listId);
    res.locals.list = currentList;

    res.render('user-task-list', {
        lists
    });
}))

router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    // Is listId in req.params already? Is it tied to the button? HOW DO WE GET THIS.
    const listId = req.params.listId

    const list = await List.findByPk(listId);

    await list.destroy();

    res.json({ message: "List successfully deleted" })
}))



module.exports = router;
