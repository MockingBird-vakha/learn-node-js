const {Router} = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async(req, res) => {
    let todos = await Todo.find({}).lean()
    
    res.render('index', {
        title: 'Todo list',
        isIndex: true,
        todos
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Todo create',
        isCreate: true
    })
})

router.post('/create', async(req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    await todo.save()

    res.redirect('/')
})

router.post('/completed', async(req, res) => {
    const todo = await Todo.findById(req.body.id)
    
    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect('/')
})

module.exports = router