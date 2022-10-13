module.exports = {
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
  },
  db: {
    url: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/track',
  },
  client: {
    url: process.env.CLIENT_URL || 'http://localhost:3000',
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  },
}
