module.exports.isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.clearCookie('isAuthenticated').sendStatus(401)
  }
  next()
}
