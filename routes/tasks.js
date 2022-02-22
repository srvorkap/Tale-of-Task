const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('./utils')
const { User, List, Task } = require('../db/models');

const { requireAuth } = require('../auth');

router.use(requireAuth);

const expCalc = (time, importance) => {

    let exp = 100;

    if (time >= 30 && time < 60) {
        exp += 25;
    } else if (time >= 60 && time < 120) {
        exp += 100;
    } else if (time >= 120 && time < 240) {
        exp += 225;
    } else if (time >= 240)
        exp += 400;

    if (importance === 1) {
        exp *= 1.1;
    } else if (importance === 2) {
        exp *= 1.25;
    } else if (importance === 3) {
        exp *= 1.5;
    }

    return Math.round(exp);
}

const taskValidator = [
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a description for your task')
        .isLength({ max: 255 })
        .withMessage('Description length must not exceed 255 characters'),
    // check('hours')
    //     .optional({ checkFalsy: true })
    //     .isNumeric({ min: 0, max: 24 })
    //     .withMessage('Hours must be between 0 and 24'),
    // check('minutes')
    //     .optional({ checkFalsy: true })
    //     .isNumeric({ min: 0, max: 60 })
    //     .withMessage('Minutes must be between 0 and 60')
]
// add a validator for importance

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const task = await Task.findByPk(parseInt(req.params.id, 10));

    return res.json(task);
}))

router.post('/', taskValidator, asyncHandler(async (req, res) => {
    // add csrf
    let {
        description, listId, dueDate, estimatedTime, importance
    } = req.body;

    const list = await List.findByPk(listId)
    const userId = list.userId

    if (!dueDate) dueDate = null;
    if (!estimatedTime) estimatedTime = null;
    if (!importance) importance = 0;

    const task = await Task.build({
        description, userId, listId, dueDate, estimatedTime, importance, completed: false, deleted: false
    })

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await task.save();

        return res.json(task);
    } else {
        const errors = validatorErrors.array().map(err => err.msg);
        return res.json({ errors });
    }
}))

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10)
    const task = await Task.findByPk(taskId)

    await task.destroy()

    res.json({ message: "Task successfully deleted" })
}))

router.put('/:id(\\d+)', taskValidator, asyncHandler(async (req, res) => {
    // add csrf
    const taskId = parseInt(req.params.id, 10)
    const task = await Task.findByPk(taskId)

    let {
        description, dueDate, estimatedTime, importance
    } = req.body;

    if (!dueDate) dueDate = null;
    // if (!estimatedTime) estimatedTime = 0;
    // if (!importance) importance = 0;

    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        await task.update({
            description,
            dueDate,
            estimatedTime,
            importance
        })
        // console.log('*** PASS ***')
        res.json(task)
    } else {
        const hours = Math.floor(estimatedTime / 60);
        const minutes = estimatedTime % 60;
        const errors = validatorErrors.array().map((error) => error.msg);
        res.json({ errors, task, hours, minutes })
    }
}))

router.get('/search', asyncHandler(async (req, res) => {

    const userId = req.session.auth.userId
    const tasks = await Task.findAll({ where: { userId, completed: false } })

    res.json(tasks)
}))


router.post('/:id(\\d+)/completed', asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const userId = req.session.auth.userId

    const { completed } = req.body;
    // console.log("in route", completed)

    const task = await Task.findByPk(taskId)
    const user = await User.findByPk(userId)

    const exp = expCalc(task.estimatedTime, task.importance);

    const currExp = user.exp;
    const remainder = 1000 - currExp;

    if (exp > remainder) {
        const diff = exp - remainder;
        await user.update({ level: user.level + 1 });
        await user.update({ exp: diff });
    }

    else {
        await user.update({ exp: user.exp + exp });
    }

    await task.update({ completed });

    const completedTasks = await Task.findAll({
        where: {
            userId: userId,
            completed: true,
        },
        // limit: 15,
    })

    res.json({ 'completedTasks': completedTasks, 'user': user })
    // console.log(completedTasks)
}))



module.exports = router;
