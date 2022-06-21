const path = require('path')
const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const server = express()
const db = new Pool({
  host: 'localhost',
  user: 'ratpuppymagic',
  database: 'react_todo'
})
server.use(express.urlencoded({extended: false}))
server.use(express.json())
server.use( cors({ origin: '*' }) )
server.listen(3001)

server.get('/todos', async (req, res) => {
  try {
    const {rows} = await db.query('SELECT * FROM todos')
    res.status(200).json(rows)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})
server.get('/todos/:id', async (req, res) => {
  try {
    const {rows} = await db.query(`SELECT * FROM todos WHERE id = ${req.params.id}`)
    res.status(200).json(rows)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})
server.patch('/todos/:id', async (req, res) => {
  try {
    console.log(req.body)
    const {data} = req.body
    await db.query(`UPDATE todos SET data = '${data}' WHERE id = ${req.params.id}`)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})
server.post('/todos', async (req, res) => {
  try {
    const {data} = req.body
    await db.query(`INSERT INTO todos (data) VALUES ('${data}')`)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})
server.delete('/todos/:id', async (req, res) => {
  try {
    await db.query(`DELETE FROM todos WHERE id = ${req.params.id}`)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})
