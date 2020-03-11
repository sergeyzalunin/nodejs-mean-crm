const express = require('express')
const controller = require('../controllers/analytics')
const router = express.Router()

//localhost:3000/api/analytics/overview
router.post('/overview', controller.overview)

//localhost:3000/api/analytics/analytics
router.post('/analytics', controller.analytics)

module.exports = router