import { v4 as uuidv4 } from 'uuid';
import express from 'express'
import morgan from 'morgan'
import bp from 'body-parser'

const { urlencoded, json } = bp

const db = {
  todos: [],
}

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))

app.get('/todo', (req, res) => {
  res.json({ data: db.todos })
})

app.post('/todo', (req, res) => {
  const newTodo = { complete: req.body.complete, id: uuidv4(), createdDate: Date.now(), urgent: req.body.urgent, description: req.body.description }
  if (!newTodo.description) {
    res.json({ data: "must provide a description!" })
    return
}
  db.todos.push(newTodo)

  res.json({ data: newTodo })
})

app.delete('/todo/:id', (req, res) => {
    console.log(req.params)
    const todoToDelete = req.params.id
    let indexToDelete = -1
    db.todos.forEach((todo, index) => {
        if (todo.id === todoToDelete) {
            indexToDelete = index
        }
    })
    if (indexToDelete === -1) {
        res.json({ data: "must provide a valid todo!" })
        return
    }
    db.todos.splice(indexToDelete, 1)
    res.json({ data: `deleted ${todoToDelete}` })
})

app.put('/todo/:id', (req, res) => {
  const todoToUpdate = req.params.id
  let indexToUpdate = -1
  db.todos.forEach((todo, index) => {
    if (todo.id === todoToUpdate) {
      indexToUpdate = index
    }
  })
  if (indexToUpdate === -1) {
    res.json({ data: "must provide a valid todo!" })
    return
  }
  db.todos[indexToUpdate].complete = req.body.complete
  db.todos[indexToUpdate].urgent = req.body.urgent
  db.todos[indexToUpdate].description = req.body.description
  
  res.json({ data: db.todos[indexToUpdate] })
})

app.get('/', (req, res) => {
  res.json({ data: db.todos })
})

app.listen(8000, () => {
  console.log('Server on http://localhost:8000')
})