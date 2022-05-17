require('dotenv').config();

const express = require('express');
const session = require('express-session');
const ejs = require('ejs');

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
    if (req.session.loggedin === true) {
        res.redirect('/');
    } else {
        res.render('pages/login');
    }
});

app.post('/login', (req, res) => {
    console.log(req.body.username);
    req.session.loggedin = true;
    res.redirect('/');
});

app.get('/', (req, res) => {
    if (req.session.loggedin === true) {
        res.send('good');
    } else {
        res.redirect('/login');
    }
})

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Listening on port ${PORT}`);
});