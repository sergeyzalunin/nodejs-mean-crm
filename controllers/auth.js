const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../modules/User')
const keys = require('../config/keys')

module.exports.login = async function login(req, res) {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        const passwordResult = await bcrypt.compare(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 3600 })

            res.json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).send({
                message: 'Wrong email or password'
            })
        }
    } else {
        res.status(404).send({
            message: 'Wrong email or password'
        })
    }
}

module.exports.register = async function register(req, res) {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        res.status(409).json({
            message: 'Such email already exists'
        })
    } else {
        const salt = await bcrypt.genSalt(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: await bcrypt.hash(password, salt)
        })

        try {
            await user.save()
            res.status(201).send(user)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    
}