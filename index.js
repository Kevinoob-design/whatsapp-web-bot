process.env.PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.post('/', (req, res) => {


});

app.use(bodyParser.json());

app.listen(process.env.PORT, () => console.log(`Server running on Port: ${process.env.PORT}`));

require('./src/message')();
