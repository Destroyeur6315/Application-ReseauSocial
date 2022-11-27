# API

## Les routes

-> définir l'ensemble des routes
-> standart d'API REST : les routes doivent être centré autour de nos ressources et que la méthode HTTP reflète l'intention de l'action

## Les fonctionnalités

-> s'incrire
-> se connecter 

donc on a les routes suivantes :

GET /register 
POST /register
GET /register/login/
POST /register/login/:idlogin

const express = require('express')
const app = express()
const parkings = require('./parkings.json')

app.get('/parkings', (req,res) => {    
    res.status(200).json(parkings)
});

const express = require('express')
const app = express()
const parkings = require('./parkings.json')
app.get('/parkings', (req,res) => {    
    res.status(200).json(parkings)
})

app.get('/parkings/:id', (req,res) => {    
    const id = parseInt(req.params.id)    
    const parking = parkings.find(parking => parking.id === id)    
    res.status(200).json(parking)
})

app.listen(8080, () => {    
    console.log("Serveur à l'écoute")
})

