const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const subdomain = require('express-subdomain');
const app = express();

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
anisoara.get('/', (req, res) =>  {
	res.redirect('http://anisoara.rotariu.me/home');
});

anisoara.get('/home', (req, res) => {
	res.render('homeAnisoara');
});

anisoara.get('/testeBAC', (req, res) => {
	res.render('testeBAC');
});

anisoara.get('/testeGM', (req, res) => {
	res.render('testeGM');
});

anisoara.get('/testeADM', (req, res) => {
	res.render('testeADM');
});

anisoara.get('/testeCriteriiSiruri', (req, res) => {
	res.render('testeCS');
});

anisoara.get('/testeLimiteSiruri', (req, res) => {
	res.render('testeLS');
});

anisoara.get('/testeLimiteParametri', (req, res) => {
	res.render('testeLP');
});

//Radu-Mihai Rotariu subdomain functionality
radu.get('/', (req, res) =>  {
	res.redirect('http://radu.rotariu.me/home');
});

radu.get('/home', (req, res) => {
	res.render('homeRadu');
});

app.listen(port, hostname, () => console.log(`Serverul rulează la adresa http://${hostname}`));
