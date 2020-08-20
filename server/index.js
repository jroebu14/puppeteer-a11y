const express = require('express')
const cors = require('cors')

const app = express()
const bbcA11y = require('../bbc-a11y')

app.use(cors())
app.get('/bbca11y', async (req, res) => {
  const problems = await bbcA11y()
  res.json(problems)
})

const port = process.env.PORT || 5000
app.listen(port)

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.status(404).send('404')
})

console.log('Listening on port ' + port)
