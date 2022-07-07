const Express = require('express');

require('dotenv').config();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = Express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Express.static('public/'));

app.use(require('./routes/api'));
app.use(require('./routes/queue'));

app.listen(process.env.PORT);
// app.listen(8080);
console.log(`http://localhost:${process.env.PORT}`)