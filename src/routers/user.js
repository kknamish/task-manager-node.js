const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const Task = require('../models/task')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed_updates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowed_updates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates.' })
    }

    try{
        updates.forEach((update) => { req.user[update] = req.body[update] })
        await req.user.save()
        res.send(req.user)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await Task.deleteMany({ owner: req.user._id })
        const user = await User.findByIdAndDelete(req.user._id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router