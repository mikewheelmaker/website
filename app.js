const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const subdomain = require('express-subdomain');
const app = express();
const fs = require('fs');
const http = require('http');
const https = require('https');
var https_options = {
	key: fs.readFileSync("/etc/letsencrypt/live/rotariu.me/privkey.pem"),
	cert: fs.readFileSync("/etc/letsencrypt/live/rotariu.me/fullchain.pem")
  };

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

var httpServer = http.createServer(app);
var httpsServer = https.createServer(app);

const hostname = '147.135.209.233';
const port = 8080;

app.get('/', (req, res) => {
	res.redirect('https://radu.rotariu.me/home');
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
	res.redirect('https://anisoara.rotariu.me/home');
});

anisoara.get('/home', (req, res) => {
	res.render('viewsA/homeAnisoara', { layout: 'layoutA' });
});

anisoara.get('/testeADM', (req, res) => {
	res.render('viewsA/testeADM', { layout: 'layoutA' });
});

anisoara.post('/rezultatADM', (req, res) => {
	let json = JSON.stringify(req.body);
	var a = JSON.parse(json);
	var c = [];
	for(let i = 0; i < listaADM.length; ++i) {
		if(a[i] != listaADM[i].corect)
			c.push([i, parseInt(a[i])]);
	}
	res.render('viewsA/rezultatADM', { Raspunsuri_gresite: c, layout: 'layoutA' });
});

anisoara.get('/testeBAC', (req, res) => {
	res.render('viewsA/testeBAC', { layout: 'layoutA' });
});

anisoara.post('/rezultatBAC', (req, res) => {
	let json = JSON.stringify(req.body);
	var a = JSON.parse(json);
	var c = [];
	for(let i = 0; i < listaBAC.length; ++i) {
		if(a[i] != listaBAC[i].corect)
			c.push([i, parseInt(a[i])]);
	}
	res.render('viewsA/rezultatBAC', { Raspunsuri_gresite: c, layout: 'layoutA' });
});

anisoara.get('/testeCriteriiSiruri', (req, res) => {
	res.render('viewsA/testeCS', { layout: 'layoutA' });
});

anisoara.post('/rezultatCS', (req, res) => {
	let json = JSON.stringify(req.body);
	var a = JSON.parse(json);
	var c = [];
	for(let i = 0; i < listaCS.length; ++i) {
		if(a[i] != listaCS[i].corect)
			c.push([i, parseInt(a[i])]);
	}
	res.render('viewsA/rezultatCS', {Raspunsuri_gresite: c, layout: 'layoutA' });
});

anisoara.get('/testeGM', (req, res) => {
	res.render('viewsA/testeGM', { layout: 'layoutA' });
});

anisoara.get('/testeLimiteParametri', (req, res) => {
	res.render('viewsA/testeLP', { layout: 'layoutA' });
});

anisoara.post('/rezultatLP', (req, res) => {
	let json = JSON.stringify(req.body);
	var a = JSON.parse(json);
	var c = [];
	for(let i = 0; i < listaLP.length; ++i) {
		if(a[i] != listaLP[i].corect)
			c.push([i, parseInt(a[i])]);
	}
	res.render('viewsA/rezultatLP', {Raspunsuri_gresite: c, layout: 'layoutA' });
});

anisoara.get('/testeLimiteSiruri', (req, res) => {
	res.render('viewsA/testeLS', { layout: 'layoutA' });
});

anisoara.post('/rezultatLS', (req, res) => {
	let json = JSON.stringify(req.body);
	var a = JSON.parse(json);
	var c = [];
	for(let i = 0; i < listaLS.length; ++i) {
		if(a[i] != listaLS[i].corect)
			c.push([i, parseInt(a[i])]);
	}
	res.render('viewsA/rezultatLS', {Raspunsuri_gresite: c, layout: 'layoutA' });
});

anisoara.get('/testePerformanta', (req, res) => {
	res.render('viewsA/testePerformanta', { layout: 'layoutA' });
});

anisoara.get('/testeMonotonie', (req, res) => {
	res.render('viewsA/testeMonotonie', { layout: 'layoutA' });
});

anisoara.get('/testeMarginire', (req, res) => {
	res.render('viewsA/testeMarginire', { layout: 'layoutA' });
});

//Radu-Mihai Rotariu subdomain functionality
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

radu.get('/', (req, res) =>  {
	res.redirect('https://radu.rotariu.me/home');
});

radu.get('/home', (req, res) => {
	res.render('viewsR/homeRadu', { layout: 'layoutR' });
});

radu.get('/iqtests', (req, res) => {
	res.render('viewsR/iqtests', { layout: 'layoutR' })
});

radu.get('/apps', (req, res) => {
	res.render('viewsR/apps', { layout: 'layoutR' })
});

radu.get('/cpp', (req, res) => {
	res.render('viewsR/cpp', { layout: 'layoutR' })
});

radu.get('/cv', (req, res) => {
	res.render('viewsR/cv', { layout: 'layoutR' })
});

radu.get('/games', (req, res) => {
	res.render('viewsR/games', { layout: 'layoutR' })
});

radu.get('/books', (req, res) => {
	res.render('viewsR/books', { layout: 'layoutR' })
});

radu.get('/origami3d', (req, res) => {
	res.render('viewsR/origami3d', { layout: 'layoutR' })
});

radu.get('/raven1', (req, res) => {
	res.render('viewsR/raven1', { rpm: listRaven1, layout: 'layoutR' });
});

radu.post('/resultRaven1', (req, res) => {
	let json = JSON.stringify(req.body);
    var a = JSON.parse(json);
    var c = [];
    for(let i = 0; i < listRaven1.length; ++i)
    {
        if(a[i] != listRaven1[i].corect)
            c.push([i,parseInt(a[i])]);
    }
	res.render('viewsR/resultRaven1', { rpm: listRaven1, Raspunsuri_gresite: c, layout: 'layoutR'});
});

radu.get('/raven2', (req, res) => {
	res.render('viewsR/raven2', { rapm: listRaven2, layout: 'layoutR' });
});

radu.post('/resultRaven2', (req, res) => {
	let json = JSON.stringify(req.body);
    var a = JSON.parse(json);
    var c = [];
    for(let i = 0; i < listRaven2.length; ++i)
    {
        if(a[i] != listRaven2[i].corect)
            c.push([i,parseInt(a[i])]);
    }
	res.render('viewsR/resultRaven2', { rapm: listRaven2, Raspunsuri_gresite: c, layout: 'layoutR'});
});

radu.get('/serebryakov', (req, res) => {
	res.render('viewsR/serebryakov', { ser: listSerebryakov, layout: 'layoutR' });
});

radu.post('/resultSerebryakov', (req, res) => {
	let json = JSON.stringify(req.body);
    var a = JSON.parse(json);
    var c = [];
    for(let i = 0; i < listSerebryakov.length; ++i)
    {
        if(a[i] != listSerebryakov[i].corect)
            c.push([i,parseInt(a[i])]);
    }
	res.render('viewsR/resultSerebryakov', { ser: listSerebryakov, Raspunsuri_gresite: c, layout: 'layoutR'});
});

httpServer.listen(8080);
//httpsServer.listen(8080);
