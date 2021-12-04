const path = require('path');
const hbs = require('hbs');
const express = require('express');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Narasimha Kamath'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        created: 'Narasimha Kamath'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Hello World!',
        name: 'Narasimha Kamath'
    });
});

app.use(express.static(publicDirectoryPath));

app.get(`/weather`, (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Address is required."
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {


    if( !req.query.search ) {
        return res.send({
            error: "You must provide a search term."
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.send("Help article not found!");
});

app.get('*', (req, res) => {
    res.send("404! NOT FOUND.")
}); 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

