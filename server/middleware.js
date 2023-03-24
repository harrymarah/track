const session = require('express-session')
const MongoStore = require('connect-mongo')
const { db } = require('./config/config')

module.exports.sessionMiddleware = session({
  resave: false,
  saveUninitialized: true,
  secret: 'bla bla bla',
  store: MongoStore.create({ mongoUrl: db.url }),
  cookie: {
    maxAge: 6 * 60 * 60 * 1000,
  },
})

module.exports.isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.clearCookie('isAuthenticated').sendStatus(401)
  }
  next()
}

module.exports.wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next)
