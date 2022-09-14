const route = require('express').Router();
const fs = require('fs');
const notes = require('../db/db.json');
const uuid =require('../tools/uuid');

const inputNotes = notes && notes.length ? notes:[];

route.get('/api/notes', (req, res) => {
    res.json(inputNotes);
  })
route.post('/api/notes', (req, res) => {
    console.info(`${req.method} request completed`)
    const { title, text } = req.body;

    if(title && text) {
        const inputWithId = {
            title,
            text,
            id: uuid()
        };
        inputNotes.push(inputWithId)
        const inputStr = JSON.stringify(inputNotes, null, 2);
        fs.writeFile('./db/notes.json', inputNotes, (err) => {
            if (err){
                console.error(err);
            }
            else {
                console.log(`caputred ${inputWithId.title}`);
            }
        } );
        const response = {
            status: 'OK',
            body: inputWithId
        };
        console.log(response);
        res.status(200).json(response);
    } else {
        res.status(500).json('broken server')
    }

});

module.exports = route