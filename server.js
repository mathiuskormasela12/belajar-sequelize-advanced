// ===== Server
// import all modules
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('helmet')
const path = require('path')

dotenv.config({ path: '.env' })

// init app
const app = express()

// destructuring PORT
const { PORT = 3000, APP_URL } = process.env

// setup morgan, compression and helmet
app.use(morgan('dev'))
app.use(compression())
app.use(helmet())

// setup urlencoded and json
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// setup static file
app.use(express.static(path.join(__dirname, './public')))

// init whitelist
const whitelist = [
  'http://localhost:3000'
]

// init cors options
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Blocked by cors'))
    }
  }
}

// use cors options
app.use(cors(corsOptions))

app.use('/api/vi', require('./src/routes/user'))

app.listen(PORT, () => {
  console.log(`Magic happen at ${APP_URL}`)
})
