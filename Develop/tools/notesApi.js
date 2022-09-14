const route = require('express').Router();
const fs = require('fs');
const notes = require('../db/notes.json');
const uuid =require('../tools/uuid');

const inputNotes = notes && notes.length ? notes:[];

route.get('/api/notes', (req, res) => {
    res.json(inputNotes);
  })
route.get('/api/notes', (req, res) => {
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
        fs.writeFile('./db/notes.json', inputStr, (err)=>
        err
          ? console.error(err)
          : console.log(
              `Note for ${inputWithId.title} has been recorded`
            ))
    }
}
)