const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Ben Yan"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ben Yan'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ben Yan',
        message: 'Example Help Message'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'You must provide an address!'
        })
        return;
    }
    geocode(req.query.address, (error, {longitude='N/A', latitude='N/A', location='N/A'}={}) => {
        if(error) {
            res.send({
                error
            })
            return;
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                res.send({
                    error
                })
                return;
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
        return;
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Ben Yan',
        error: 'Help article not found.'
    });
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404: Not Found',
        name: 'Ben Yan',
        error: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})