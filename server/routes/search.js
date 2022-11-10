const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/user')
const { spotify, client } = require('../config/config')
const getRefreshToken = require('../utils/getRefreshToken')

router.get('/search', (req, res) => {
    
})