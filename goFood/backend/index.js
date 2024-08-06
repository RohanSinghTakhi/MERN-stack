/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const express = require('express')
const mongodb = require('./db')

mongodb()
const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))