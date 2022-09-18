require('dotenv').config()
const express = require('express')

const cors = require('cors')

const app = express()

const { registerRoute } = require('./routes/registerRoute')

const port = process.env.PORT || 4001

const corsOptions = {
  origin: process.env.DOMAINS?.split(','),
  methods: 'POST'
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

registerRoute(app)

app.listen(port, () => {
  console.log(`App is listening on ${port}`)
})
