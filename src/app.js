const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

// Setup Handlebars Engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rebecca Winter'
    })
})

app.get("/about", (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Rebecca Winter'
    })
})

app.get("/help", (req, res) => {
    res.render('help',{
        title: 'Help',
        message: 'Let us know if any help needed',
        name: 'Rebecca Winter'
    })
})

app.get('/weather',(req, res) => {

    if (!req.query.address) {
        return res.send({
        error: 'You must provide an address'})
    }

    geocode(req.query.address,(error,{latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
    
        
        forecast( latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            
            res.send({
                location,
                forecast: forecastdata,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: {}
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title: '404 error',
        name: 'Rebecca Winter',
        errorMessage : 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        title: '404 error',
        name: 'Rebecca Winter',
        errorMessage : 'Page not found'
    })
})

app.get('*',(req,res) => {
    res.send('Page not found')
})

app.get('*',(req,res) => {
    res.send('My 404 page')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})