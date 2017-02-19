const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
var now = new Date().toString();
var log = `${now} : ${req.method} : ${req.url}`;

fs.appendFile('server.log' , log + '\n', (error) => {
    if(error){
        console.log(error);
    }
});
console.log(log);
next();
});

// app.use((req, res, next) => {
// res.render('maintenance.hbs');
// });

app.set('view enine', 'hbs');
hbs.registerHelper('getcopyrightYear', () => {
return new Date().getFullYear();
});

hbs.registerHelper('screamit', (test) => {
return test.toUpperCase();
});

app.get('/', (req, res) => {

res.render('home.hbs', {
    welcomeMessage : 'Welcome to my Home page',
    pageTitle : 'Home Page of Gkan'
});

// res.send('<h2>Hello Gkan Express</h2>');
// res.send({
//     name : 'George',
//     love : 'Sofia',
//     all : 'george + sofia',
//     like : [
//         'Eating',
//         'Walking',
//         'traveling'
//     ]
// });
});

app.get('/about', (req, res) => {
// res.send('<b>About Page Gkan</b>');
res.render('about.hbs', {
pageTitle : 'About Gkans Page'
});
});

app.get('/bad', (req, res) => {
res.send({
    errorMessage : 'Bad Request'
});
});


app.listen(port, () => {
    console.log('Server is up on port : ' + port);
});