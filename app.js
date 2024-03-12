const express = require('express');
const app = express();
const port = 3000;

// Middleware pour vérifier l'heure de la demande
const checkTime = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const hour = date.getHours();
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('L\'application web est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
    }
};

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(checkTime);

app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Nos services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contactez-nous' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
