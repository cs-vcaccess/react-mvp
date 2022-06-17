const path = require('path')
const express = require('express')
const { Pool } = require('pg')
const server = express()
const db = new Pool({
  host: 'localhost',
  user: 'ratpuppymagic',
  database: 'react_todo'
})
server.use(express.urlencoded({extended: false}))
server.use(express.json())
server.use(express.static("whateverIwant"))
server.listen(3001)

server.get('/todos', (req, res) => {
  res.status(200).json({"idk": "This is json"})
})
