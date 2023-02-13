const jwt = require('jsonwebtoken')
const { auth } = require('../config/config')

module.exports = authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, auth.accessTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403)
    console.log(user)
    console.log(req.user)
    // req.user = user
    next()
  })
}
