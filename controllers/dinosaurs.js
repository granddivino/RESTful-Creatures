const express = require('express');
const router = express.Router();
const fs = require('fs');

// ----> Dino INDEX route <-----
router.get('/', (req, res)=> {
    // Take the text from dinosaurs.json and store it in a variable
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) //Converts the string into an array

    //Handle a query string if there is one
    let nameFilter = req.query.nameFilter //Whatever is entered into the query is converted into nameFilter
    if(nameFilter) { //Re-assign dinoData to only be an arry of dinos whose name 
        // matches the query string name (and make it ignore case)
        dinoData = dinoData.filter(dino => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dinosaurs/index', {dinosaurs: dinoData})
})


// ----> Dino NEW route <---- **NEEDS TO BE ABOVE SHOW ROUTE**
router.get('/new', (req, res)=> {
    res.render('dinosaurs/new')
})    


// ---- Dino SHOW route <----
router.get('/:id', (req, res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //Get array index from URL parameter
    let dinoIndex = parseInt(req.params.id)
    res.render('dinosaurs/show', {dino: dinoData[dinoIndex], dinoId: dinoIndex})
})

// ----> Dino POST route <-----
router.post('/', (req,res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body) //Push the new dino to the array
    //Save the new dinoData array to the dinosaurs.json file
    //JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //Redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})

module.exports = router;