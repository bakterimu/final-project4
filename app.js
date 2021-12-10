const express = require('express');
const port = 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('./routes')(app);

app.listen(port, () => {
    console.log('Listening on port: ', port);
});
