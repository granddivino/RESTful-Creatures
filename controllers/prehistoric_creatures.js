const express = require('express')
const router = express.Router()
const fs = require('fs');


// ----> Prehistoric Creatures Index route <-----
router.get('/', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    res.render('prehistoric_creatures/index', {creatures: creatureData})
  })

// ----> Prehistoric Creatures New route <-----
router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new')
  })

// ----> Prehistoric Creatures Show route <-----
router.get('/:id', (req, res) => {
    const index = parseInt(req.params.id)
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    res.render('prehistoric_creatures/show', {creature: creatureData[index], creatureID: index})
  });

// ----> Prehistoric Creatures Post route <-----
router.post('/',(req,res)=> {
    // Read from the database
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    // Take a JSON object and return a js object
    const creatureData = JSON.parse(creatures)
    // Add the new data to the array
    creatureData.push(req.body)
    // Update the database
    fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(creatureData))
    // Redirect to the GET /prehistoric_creatures route
    res.redirect('/prehistoric_creatures')
  })

module.exports = router;