const express = require('express');
const htmlCall = require('./tools/html');
const notesCall = require('./tools/notesApi');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api',notesCall);
app.use('/',htmlCall);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);








