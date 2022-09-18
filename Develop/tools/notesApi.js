const route = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');
const uuid =require('../tools/uuid');

const inputNotes = db && db.length ? db:[];
//forgot that you're starting at the api point here so I wrestled with this one for a while
route.get(`/api`, (req, res) => {
    res.json(inputNotes);
  })
  //this part seems to be trouble because i keep re writing the path and it returns not found every single time.. I've reached out to askBCS again for how to fix it.
route.post(`/api`, (req, res) => {
    console.info(`${req.method} request completed`)
    const { title, text } = req.body;

    if(title && text) {
        const inputWithId = {
            title,
            text,
            id: uuid()
        };

        inputNotes.push(inputWithId);

        const inputStr = JSON.stringify(inputNotes, null, 2);

        fs.writeFile('./db/db.json', inputStr, (err) => 
            err
            ? console.error(err)
            : console.log(
                `note for ${inputWithId} completed`
            )
        );
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