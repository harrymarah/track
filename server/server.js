const express = require('express')
const app = express()
const port = 3001

app.get('/api', (req, res) => {
  res.json({ names: ['Harry', 'Michael', 'Maine', 'Marah'] })
})

app.listen(port, () => {
  console.log(`Server connection successful, listening on port ${port}`)
})
