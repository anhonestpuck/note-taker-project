const { Router } = require('express');
const path = require('path');
const route = require('express').Router();

route.get('/', (req,res) => 
res.sendFile(path.join(__dirname, '../public/index.html'))
);

route.get('notes',(req, res) => {
    res.sendFile(path.join(__dirname, '../public.notes.html'))
    console.info(`${req.method} request to grab notes`)
});
