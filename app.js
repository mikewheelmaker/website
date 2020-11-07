const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const subdomain = require('express-subdomain');
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

const anisoara = express.Router();
const radu = express.Router();
app.use(subdomain('anisoara', anisoara));
app.use(subdomain('radu', radu));

const hostname = '147.135.209.233';
const port = 8080;

app.get('/', (req, res) => {
	res.redirect('http://radu.rotariu.me/home');
});

//Anisoara Rotariu subdomain functionality
let listaADM;
fs.readFile('public/anisoara/ADM.json', (err, data) => {
	if (err) throw err;
	listaADM = JSON.parse(data);
});

let listaBAC;
fs.readFile('public/anisoara/BAC.json', (err, data) => {
	if (err) throw err;
	listaBAC = JSON.parse(data);
});

let listaCS;
fs.readFile('public/anisoara/CS.json', (err, data) => {
	if (err) throw err;
	listaCS = JSON.parse(data);
});

let listaLP;
fs.readFile('public/anisoara/LP.json', (err, data) => {
	if (err) throw err;
	listaLP = JSON.parse(data);
});

let listaLS;
fs.readFile('public/anisoara/LS.json', (err, data) => {
	if (err) throw err;
	listaLS = JSON.parse(data);
});

anisoara.get('/', (req, res) =>  {
	res.redirect('http://anisoara.rotariu.me/home');
});

anisoara.get('/home', (req, res) => {
	res.render('homeAnisoara');
});

anisoara.get('/testeADM', (req, res) => {
	res.render('testeADM');
});

anisoara.post('/rezultatADM', (req, res) => {
	let json = JSON.stringify(req.body);
	var a = JSON.parse(json);
	var c = [];
	for(let i = 0; i < listaADM.length; ++i) {
		if(a[i] != listaADM[i].corect)
			c.push([i, parseInt(a[i])]);
	}
	res.render('rezultatADM', {Raspunsuri_gresite: c});
});

anisoara.get('/testeBAC', (req, res) => {
	res.render('testeBAC');
});

anisoara.post('/rezultatBAC', (req, res) => {
	let json = JSON.stringify(req.body);
	var a = JSON.parse(json);
	var c = [];
	for(let i = 0; i < listaBAC.length; ++i) {
		if(a[i] != listaBAC[i].corect)
			c.push([i, parseInt(a[i])]);
	}
	res.render('rezultatBAC', {Raspunsuri_gresite: c});
});

anisoara.get('/testeCriteriiSiruri', (req, res) => {
	res.render('testeCS');
});

anisoara.post('/rezultatCS', (req, res) => {
	let json = JSON.stringify(req.body);
	var a = JSON.parse(json);
	var c = [];
	for(let i = 0; i < listaCS.length; ++i) {
		if(a[i] != listaCS[i].corect)
			c.push([i, parseInt(a[i])]);
	}
	res.render('rezultatCS', {Raspunsuri_gresite: c});
});

anisoara.get('/testeGM', (req, res) => {
	res.render('testeGM');
});

anisoara.get('/testeLimiteParametri', (req, res) => {
	res.render('testeLP');
});

anisoara.post('/rezultatLP', (req, res) => {
	let json = JSON.stringify(req.body);
	var a = JSON.parse(json);
	var c = [];
	for(let i = 0; i < listaLP.length; ++i) {
		if(a[i] != listaLP[i].corect)
			c.push([i, parseInt(a[i])]);
	}
	res.render('rezultatLP', {Raspunsuri_gresite: c});
});

anisoara.get('/testeLimiteSiruri', (req, res) => {
	res.render('testeLS');
});

anisoara.post('/rezultatLS', (req, res) => {
	let json = JSON.stringify(req.body);
	var a = JSON.parse(json);
	var c = [];
	for(let i = 0; i < listaLS.length; ++i) {
		if(a[i] != listaLS[i].corect)
			c.push([i, parseInt(a[i])]);
	}
	res.render('rezultatLS', {Raspunsuri_gresite: c});
});

//Radu-Mihai Rotariu subdomain functionality
radu.get('/', (req, res) =>  {
	res.redirect('http://radu.rotariu.me/home');
});

radu.get('/home', (req, res) => {
	res.render('homeRadu');
});

app.listen(port, hostname, () => console.log(`Serverul rulează la adresa http://${hostname}`));
