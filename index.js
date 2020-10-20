const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')


app.set('view engine', 'ejs')
app.use(ejsLayouts)
// Body-Parser middleware -- to get data from forms
app.use(express.urlencoded({extended: false}))


//Root/home route
app.get('/', (req, res)=> {
    res.render('home') 
})


//Controllers
const dinoControl = require('./controllers/dinosaurs')
const creatureControl= require('./controllers/prehistoric_creatures')

app.use('/dinosaurs', dinoControl)
app.use('/prehistoric_creatures', creatureControl)


app.listen(8000, ()=> {
    console.log("Dinosaurs and Prehistoric Creatures!")
})