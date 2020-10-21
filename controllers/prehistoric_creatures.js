const express = require('express')
const router = express.Router()
const fs = require('fs')
const methodOverride = require('method-override')


router.use(methodOverride('_method'))

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
    const creatureIndex = parseInt(req.params.id)
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    res.render('prehistoric_creatures/show', {creature: creatureData[creatureIndex], creatureId: creatureIndex})
  })

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

  // ----> Prehistoric Creatures GET route <----
router.get('/edit/:idx', (req,res)=> {
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)
  res.render('./prehistoric_creatures/edit', {creature: creatureData[req.params.idx], creatureId: req.params.idx})
})


// ----> Prehistoric Creature PUT route <----
router.put('/:idx', (req,res) => {
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)
  //reassign the creature's fields to be that which the user input
  creatureData[req.params.idx].img_url = req.body.img_url
  creatureData[req.params.idx].type = req.body.type
  //save the edited array to the json file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
  res.redirect('/prehistoric_creatures/'+req.params.idx)
})

// ----> Prehistoric Creature DELETE route <----
router.delete('/:idx', (req, res) => {
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)
  //remove the deleted prehistoric creature from the prehistoric creatires array
  creatureData.splice(req.params.idx, 1)
  //save the new prehistoric creature to the JSON file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
  res.redirect('/prehistoric_creatures')
})



module.exports = router;