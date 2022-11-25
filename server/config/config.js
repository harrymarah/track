module.exports = {
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
  },
  db: {
    url: process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/track',
  },
  client: {
    url: process.env.CLIENT_URL || 'http://localhost:3000',
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  },
  auth: {
    accessTokenSecret:
      process.env.ACCESS_TOKEN_SECRET || 'thisisatempoaryaccesstokensecret',
    refreshTokenSecret:
      process.env.REFRESH_TOKEN_SECRET || 'thisisatempoaryrefreshtokensecret',
  },
}
