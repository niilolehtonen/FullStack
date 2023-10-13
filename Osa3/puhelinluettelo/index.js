const express = require('express')
const app = express()

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
        },
        {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
        },
        {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
        },
        {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
        }
  ]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req,res) => {
    const numberofPersons = persons.length
    const infoMessage = `Phonebook has info for ${numberofPersons} people`
    const requestTime = new Date()
    res.writeHead(200, 'Content-Type', 'text/plain')
    res.end(`${infoMessage}\n${requestTime}`)
})
  
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)