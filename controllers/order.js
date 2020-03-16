const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

// (get) localhost:3000/api/order?offset=2&limit=5
module.exports.getAll = async function getAll(req, res) {
    const query = {
        user: req.user.id
    }

    // Date begin
    if (req.query.start) {
        query.date = {
            // greater or equal
            $gte: req.query.start
        }
    }

    // Date end
    if (req.query.end) {
        if (!query.date) {
            query.date = {}
        }

        // less or equal
        query.date['$lte'] = req.query.end
    }
    
    // Order number
    if (req.query.order) {
        query.order = +req.query.order
    }

    try {

        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)

        res.json(orders)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.create = async function create(req, res) {
    try {
        const lastOrder = await Order
            .findOne({user: req.user.id})
            .sort({date: -1})

        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save()

        res.status(201).json(order)
    } catch (error) {
        errorHandler(res, error)
    }
}