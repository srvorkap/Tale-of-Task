const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('./utils')
const { User, List, Task } = require('../db/models');

const { requireAuth } = require('../auth');


// router.use(requireAuth);

const taskValidator = [
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a description for your task')
        .isLength({ max: 255 })
        .withMessage('Description length must not exceed 255 characters')
]

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const task = await Task.findByPk(parseInt(req.params.id, 10));
    res.json({ task });
}))

router.post('/', taskValidator, asyncHandler(async (req, res) => {
    let {
        description, userId, listId, dueDate, estimatedTime, importance
    } = req.body;

    if (!dueDate) dueDate = null;
    if (!estimatedTime) estimatedTime = null;
    if (!importance) importance = 0;

    const task = await Task.build({
        description, userId, listId, dueDate, estimatedTime, importance, completed: false, deleted: false
    })

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await task.save();
        return res.json({ task });
    } else {
        const errors = validatorErrors.array().map(err => err.msg);
        // const errorBox = document.getElementById('task-errors');
        // const errorsHtml = errors.map(error => {
        //     return `
        //     <li>${error}</li>
        //     `
        // })
        // const ul = document.createElement('ul')
        // ul.innerHTML = errorsHtml.join('');
        // errorBox.appendChild(ul);
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
    const taskId = parseInt(req.params.id, 10)
    const task = await Task.findByPk(taskId)
    const {
        description, listId, dueDate, estimatedTime, importance, deleted, completed
    } = req.body;


    await task.update({
        description,
        listId,
        dueDate,
        estimatedTime,
        completed,
        deleted,
        importance
    })
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        await task.save()
        res.json({ task })
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.json({errors, task})
    }
}))



module.exports = router;
