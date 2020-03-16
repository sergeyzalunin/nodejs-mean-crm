const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getCategoryId = async function getCategoryId(req, res) {
    try {
        const positions = await Position.find({ 
            user: req.user.id,
            category: req.params.categoryId
         })
         res.json(positions)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.create = async function create(req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        })

        await position.save()
        res.status(201).json(position)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.remove = async function remove(req, res) {
    try {
        await Position.remove({ _id: req.params.id })
        res.json({
            message: 'Position was removed'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.update = async function update(req, res) {
    try {
        const position = await Position.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true })

        res.json(position)
    } catch (error) {
        errorHandler(res, error)
    }
}