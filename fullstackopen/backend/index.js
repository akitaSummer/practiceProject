const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
]

const generateId = () => {
  return Math.max(...persons.map(person => person.id)) + 1
}

app.get('/info', (req, res) => {
  res.send(
    `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date.now()}</p>
    `
  )
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id === id)

  res.status(204).end()
})

app.post('/api/persons/', (req,res) => {
  const resError = (str) => {
    res.status(400).json({
      error: str
    })
  }
  const personPush = (person) => {
    person = {
      id: generateId(),
      name: person.name,
      number: person.number
    }
    persons.push(person)
    res.json(person)
  }
  const person = req.body
  if (person.name && person.number) {
    persons.find(item => item.name === person.name) ? resError('The name have been.') : personPush(person)
  } else {
    resError(person.name ? 'number must be unique' : 'name must be unique')
  }
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
