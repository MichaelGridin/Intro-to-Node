import express from 'express'
import morgan from 'morgan'
import bp from 'body-parser'

const { urlencoded, json } = bp

const db = {
  colors: [],
}

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))

app.get('/color', (req, res) => {
  res.json({ data: db.colors })
})

app.post('/color', (req, res) => {
  console.log(req.body)  
  const newColor = req.body.color
  db.colors.push(newColor)

  res.json({ data: newColor })
})

app.delete('/color', (req, res) => {
    const colorToDelete = req.body.color
    const index = db.colors.indexOf(colorToDelete)
    if (index === -1) {
        res.json({ data: "must provide a valid color!" })
        return
    }
    db.colors.splice(index, 1)
    res.json({ data: `deleted ${colorToDelete}` })
})

app.get('/', (req, res) => {
  res.json({ data: db.colors })
})

app.listen(8000, () => {
  console.log('Server on http://localhost:8000')
})