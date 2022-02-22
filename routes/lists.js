const express = require('express')
const { csrfProtection, asyncHandler } = require('./utils')
const { User, List, Task } = require('../db/models')
const { check, validationResult } = require('express-validator')
const { requireAuth } = require('../auth');
const { Op } = require('sequelize');

const router = express.Router()

const userValidators = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a list name.')
        .isLength({ max: 50 })
        .withMessage('List name must not exceed 50 characters.')
]

router.use(requireAuth)

router.post('/', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
    //add csrf
    const userId = req.session.auth.userId;
    const { name } = req.body;
    const list = List.build({
        name
    })

    const validatorErrors = validationResult(req);

    // Check if name of list exists in this user's lists already
    const checkList = await List.findOne({
        where: {
            name,
            userId
        }
    })

    if (checkList) {
        validatorErrors.errors.push({
            msg: "You already have a list with that name."
        })
    }

    // On success
    if (validatorErrors.isEmpty()) {
        list.userId = userId
        await list.save()
        res.locals.list = list;
        res.json({
            message: list.id,
            csrfToken: req.csrfToken()
        })
        // On errors
    } else {
        const errors = validatorErrors.array().map(err => err.msg)
        res.json({
            errors,
            csrfToken: req.csrfToken()
        })
    }
}))

router.get('/:id(\\d+)/tasks', asyncHandler(async (req, res) => {
    const listId = parseInt(req.params.id, 10);
    const tasks = await Task.findAll({
        where: {
            listId,
            completed: false
        },
        order: [
            ['dueDate', 'DESC'],
            ['importance', 'DESC'],
            ['id', 'ASC']
        ]
    })

    res.json(tasks);
}));

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    const userId = req.session.auth.userId;
    const listId = parseInt(req.params.id, 10);

    let lists = await List.findAll({
        where: {
            userId,
            name: {
                [Op.not]: 'Inbox'
            }
        }
    })

    JSON.stringify(lists)

    //Set res.locals.list to currentList
    const currentList = await List.findByPk(listId);

    if (currentList === null || currentList.userId !== userId) {
        let inbox = await List.findOne({
            where: {
                userId,
                name: "Inbox"
            }
        })
        return res.redirect(`/lists/${inbox.id}`)
    }

    res.locals.list = currentList;

    const tasks = await Task.findAll({
        where: {
            listId: listId,
            completed: false
        },
        order: [
            ['dueDate', 'DESC'],
            ['importance', 'DESC'],
            ['id', 'ASC']
        ]
    })

    const completedTasks = await Task.findAll({
        where: {
            listId: listId,
            completed: true
        },
        order: [
            ['updatedAt', 'DESC']
        ],
        limit: 15
    })

    JSON.stringify(tasks);

    let inbox = await List.findOne({
        where: {
            userId,
            name: "Inbox"
        }
    })

    JSON.stringify(inbox);

    res.render('user-task-list', {
        title: `TALE Of TASK - ${currentList.name}`,
        completedTasks,
        inbox,
        lists,
        tasks,
        csrfToken: req.csrfToken()
    });
}))

router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const userId = req.session.auth.userId;
    const listId = req.params.id
    const list = await List.findByPk(listId);

    // Added removing tasks to ensure list deletion
    const tasks = await Task.findAll({
        where: {
            listId
        }
    })

    tasks.forEach(async (task) => {
        await task.destroy();
    })
    await list.destroy();

    // FIND ALL LISTS TO NAVIGATE TO THE FIRST OF THE USER'S LISTS
    let lists = await List.findAll({
        where: {
            userId
        }
    })
    JSON.stringify(lists)

    let currentList = lists[0];
    res.json({
        message: currentList.id
    })
}))

router.put('/:id(\\d+)', csrfProtection, userValidators, asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId;
    const listId = parseInt(req.params.id, 10);
    const list = await List.findByPk(listId);
    const {
        name
    } = req.body;

    let lists = await List.findAll({
        where: {
            userId
        }
    })
    JSON.stringify(lists)

    const tasks = await Task.findAll({
        where: {
            listId
        }
    })
    const validatorErrors = validationResult(req);

    JSON.stringify(tasks);

    // Check if name of list exists in this user's lists already
    const checkList = await List.findOne({
        where: {
            name,
            userId
        }
    })

    if (checkList) {
        validatorErrors.errors.push({
            msg: "You already have a list with that name."
        })
    }

    if (validatorErrors.isEmpty()) {
        await list.update({
            name
        })
        return res.json({
            message: list.id,
            csrfToken: req.csrfToken()
        })
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        return res.json({
            errors,
            csrfToken: req.csrfToken()
        })
    }

}))

module.exports = router;
