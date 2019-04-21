const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors');

// Constants / Config
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/client/build')));
app.use(cors()); // Only to be used for development

app.get('/api/entries', (req, res) => {
    return db.entries.findAll({
            attributes: ['id', 'date', 'climbing_time']
        })
        .then((entries) => res.send(entries))
        .catch((err) => {
            console.log('An error occurred querying the entries', 
                JSON.stringify(err));
            return res.send(err);
        });
});

app.get('/api/entries/:id', (req, res) => {
    const id = parseInt(req.params.id);
    return db.entries.findByPk(id)
        .then((entry) => res.send(entry))
        .catch(err => {
            console.log("An error occurred querying the entry",
                JSON.stringify(err));
            return res.send(err);
        });
});

app.post('/api/entries/', (req, res) => {
    const { date, entry, climbing_time,
        warmup_time, accomplishment,
        current_goal, weight } = req.body;
    return db.entries.create({ date, entry,
        climbing_time, warmup_time, accomplishment,
        current_goal, weight})
        .then((entry) => res.send(entry))
        .catch((err) => {
            console.log("*** Error creating contact", 
                JSON.stringify(entry));
            return res.status(400).send(err);
        });
});

app.put('/api/entries/:id', (req, res) => {
    const id = parseInt(req.params.id);
    return db.entries.findByPk(id)
        .then(entryToUpdate => {
            const { date, entry, climbing_time,
                warmup_time, accomplishment,
                current_goal, weight } = req.body;
            return entryToUpdate.update({ date, entry, 
                        climbing_time, warmup_time, accomplishment,
                        current_goal, weight })
                    .then(() => res.send(entryToUpdate))
                    .catch(err => {
                        console.log("*** Error " +
                            "updating contact",
                            JSON.stringify(err));
                        res.status(400).send(err);
                    });
        });
});


app.delete('/api/entries/:id', (req, res) => {
    const id = parseInt(req.params.id);
    return db.entries.findByPk(id)
        .then(entry => entry.destroy())
        .then(() => res.send({ id }))
        .catch(err => {
            console.log("*** An error occurred deleting contact",
                JSON.stringify(err));
            res.status(400).send(err);
        });
});

// If the request is different from any of the ones above, 
// send the client the react app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
    console.log('Now running on port ' + port + '.'); 
});
