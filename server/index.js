const port = 5376;
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let animals = [
    {
        id: 1,
        name: 'Gato',
        strength: 4
    },
    {
        id: 2,
        name: 'Elefante',
        strength: 8
    },
    {
        id: 3,
        name: 'Murcielago',
        strength: 1
    }
]
let currentId = animals.length;

app.get('/animals', (req, res) => {
    res.send(animals);
})

app.post('/animals', (req, res) => {
    animals.push({
        id: currentId + 1,
        name: req.body.name,
        strength: req.body.strength
    })
    console.log('Created...');
    currentId++;
    res.sendStatus(201);
});

app.delete('/animals/:id', (req, res) => {
    const idToDelete = Number(req.params.id);
    const filteredAnimals = animals.filter((animal) => animal.id !== idToDelete);
    if (filteredAnimals.length == animals.length) {
        res.status(404).send('No animal deleted...');
    } else {
        animals = filteredAnimals;
        res.status(200).send('Animal deleted...');
    }
});

app.put('/animals/:id', (req, res) => {
    const idToUpdate = Number(req.params.id);
    if (!req.body) {
        res.status(400).send('Body not provided');
        return;
    }
    const nameToUpdate = req.body.name;
    const strengthToUpdate = req.body.strength;
    if (!nameToUpdate || !strengthToUpdate) {
        res.status(400).send('Please provide name and strength to update');
        return;
    }
    //Obtener elemento id del array para actualizarlo
    const indexAnimal = animals.findIndex((animal) => animal.id == idToUpdate);
    if(indexAnimal >= 0){
        animals[indexAnimal].name = nameToUpdate;
        animals[indexAnimal].strength = strengthToUpdate;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`App listening on ${port}`);
});
