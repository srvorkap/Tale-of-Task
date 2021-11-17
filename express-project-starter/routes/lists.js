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

router.post('/', userValidators, asyncHandler(async (req, res, next) => {
    //add csrf
    const userId = req.session.auth.userId;
    const { name } = req.body;
    const list = List.build({
        name
    })

    //For Sidebar
    let lists = await List.findAll({
        where: {
            userId
        }
    })
    JSON.stringify(lists)

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        list.userId = userId
        await list.save()
        res.locals.list = list;

        res.redirect(`/lists/${list.id}`)
    } else {
        const errors = validatorErrors.array().map(err => err.msg)
        res.render('user-task-list', {
            lists,
            errors
            //csrftoken
        })
    }
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const userId = req.session.auth.userId;
    const listId = req.params.id;
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

    const tasks = await Task.findAll({
        where: {
            listId
        }
    })

    JSON.stringify(tasks);

    res.render('user-task-list', {
        lists,
        tasks
    });
}))

router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    // Is listId in req.params already? Is it tied to the button? HOW DO WE GET THIS.
    const listId = req.params.listId
    const list = await List.findByPk(listId);
    await list.destroy();
    res.json({ message: "List successfully deleted" })
}))

router.put('/:id(\\d+)', userValidators, asyncHandler(async(req, res) => {
    const listId = parseInt(req.params.id, 10);
    const list = await List.findByPk(listId);
    const {
        name
    } = req.body;

    await list.update({
        name
    })

    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        await list.save();
        res.render('user-task-list')
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        return res.json({
            errors,
            csrfToken: req.csrfToken(),
        })
    }

}))


module.exports = router;
