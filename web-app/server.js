const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) throw err;
    console.log('Log data was appended to file!');
  })

  next();
});

app.use((req, res, next) => {
  return res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  return res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my home page',
  });
});

app.get('/about', (req, res) => {
  return res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.listen(port, () => console.log(`Server up and running on port ${port}`));
