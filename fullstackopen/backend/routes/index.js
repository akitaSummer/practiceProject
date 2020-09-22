const Router = require('express').Router()

const mongoose = require('mongoose')

const Person = mongoose.model('Person')

Router.get('/', async (req, res) => {
  const persons = await Person.find()
  res.json(persons)
})

Router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const person = await Person.findById(id)

  person ? res.json(person) : res.status(404).end()
})

Router.delete('/:id', async (req,res) => {
  const id = Number(req.params.id)
  const person = await Person.findByIdAndDelete(id)

  res.status(204).end()
})

Router.post('/', async (req,res) => {
  const person = new Person(req.body)

  await person.save((error, item) => res.json(item))
})

module.exports = Router
