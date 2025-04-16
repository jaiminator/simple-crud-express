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
    console.log('Created');
    currentId++;
    res.sendStatus(201);
});

app.delete('/animals/:id', (req, res) => {
    const idToDelete = Number(req.params.id);
    const filteredAnimals = animals = animals.filter((animal) => animal.id !== idToDelete);
    if (filteredAnimals.length == animals.length) {
        res.status(404).send('No animal deleted');
    } else {
        animals = filteredAnimals;
        res.sendStatus(200);
    }
});

/* app.put('/animals', (req, res) => {
    
}); */

app.listen(port, () => {
    console.log(`App listening on ${port}`);
});
