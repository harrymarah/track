const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    ['/auth', '/player', '/search', '/data'],
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
      changeOrigin: true,
      // uncomment when hosting on network
      // secure: false,
    })
  )
}
