const express = require('express')
const router = express.Router()
const { isAuth } = require('../middleware')
const { conductSearch } = require('../controller/search')

router.get('/', isAuth, conductSearch)

module.exports = router
