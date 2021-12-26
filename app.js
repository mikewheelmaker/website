const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'));
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));

const hostname = '147.135.209.233';
const port = 8080;

let listRaven1;
fs.readFile('public/radu/rpm/rpm.json', (err, data) => {
  if (err) throw err;
  listRaven1 = JSON.parse(data);
});

let listRaven2;
fs.readFile('public/radu/rapm/rapm.json', (err, data) => {
  if (err) throw err;
  listRaven2 = JSON.parse(data);
});

let listSerebryakov;
fs.readFile('public/radu/ser/serebryakov.json', (err, data) => {
  if (err) throw err;
  listSerebryakov = JSON.parse(data);
});

app.get('/', (req, res) =>  {
	res.redirect('http://radumihairotariu.ro/home');
});

app.get('/home', (req, res) => {
	res.render('homeRadu');
});

app.get('/3dprinting', (req, res) => {
	res.render('3dprinting');
});

app.get('/apps', (req, res) => {
	res.render('apps')
});

app.get('/books', (req, res) => {
	res.render('books')
});

app.get('/cpp', (req, res) => {
	res.render('cpp')
});

app.get('/cv', (req, res) => {
	res.render('cv')
});

app.get('/games', (req, res) => {
	res.render('games')
});

app.get('/iqtests', (req, res) => {
	res.render('iqtests')
});

app.get('/origami3d', (req, res) => {
	res.render('origami3d')
});

app.get('/raven1', (req, res) => {
	res.render('raven1', { rpm: listRaven1 });
});

app.post('/resultRaven1', (req, res) => {
	let json = JSON.stringify(req.body);
    var a = JSON.parse(json);
    var c = [];
    for(let i = 0; i < listRaven1.length; ++i)
    {
        if(a[i] != listRaven1[i].corect)
            c.push([i,parseInt(a[i])]);
    }
	res.render('resultRaven1', { rpm: listRaven1, Raspunsuri_gresite: c });
});

app.get('/raven2', (req, res) => {
	res.render('raven2', { rapm: listRaven2 });
});

app.post('/resultRaven2', (req, res) => {
	let json = JSON.stringify(req.body);
    var a = JSON.parse(json);
    var c = [];
    for(let i = 0; i < listRaven2.length; ++i)
    {
        if(a[i] != listRaven2[i].corect)
            c.push([i,parseInt(a[i])]);
    }
	res.render('resultRaven2', { rapm: listRaven2, Raspunsuri_gresite: c });
});

app.get('/serebryakov', (req, res) => {
	res.render('serebryakov', { ser: listSerebryakov });
});

app.post('/resultSerebryakov', (req, res) => {
	let json = JSON.stringify(req.body);
    var a = JSON.parse(json);
    var c = [];
    for(let i = 0; i < listSerebryakov.length; ++i)
    {
        if(a[i] != listSerebryakov[i].corect)
            c.push([i,parseInt(a[i])]);
    }
	res.render('resultSerebryakov', { ser: listSerebryakov, Raspunsuri_gresite: c });
});

app.listen(port, hostname, () => console.log(`Serverul rulează la adresa http://${hostname}`));