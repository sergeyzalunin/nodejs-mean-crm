const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function getAll(req, res) {
    try {
        const categories = await Category.find({
            user: req.user.id
        })
        res.send(categories)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getById = async function getById(req, res) {
    try {
        const categories = await Category.findById(req.params.id)
        res.send(categories)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.remove = async function remove(req, res) {
    try {
        await Category.remove({_id: req.params.id})
        await Position.remove({category: req.params.id})
        res.json({
            message: 'Category was removed'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.create = async function create(req, res) {
    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
    })

    try {
        await category.save()
        res.json(category)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.update = async function update(req, res) {
    const updated = {
        name: req.body.name
    }

    if (req.file) {
        updated.imageSrc = req.file.path
    }

    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.json(category)
    } catch (error) {
        errorHandler(res, error)
    }
}