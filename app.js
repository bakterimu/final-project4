const express = require('express');
const routes = require('./routes')
// const photoRoutes = require('./routes/photoRoutes.js');
// const commentRoutes = require('./routes/commentRoutes');
// const socialMediaRoutes = require('./routes/socialMediaRoutes.js');
// const authRoutes = require('./routes/authRoutes');
const port = 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log('Listening on port: ', port);
});