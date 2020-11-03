const express = require('express')
const app = express() //excess up and running
const port = 4000 // changed as react uses 3000
const path = require('path') // provides utilities for working with file and directory paths - not actually needed
const bodyParser = require('body-parser') // body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => { // on request /, responds with message
    res.send('Welcome to Data Representation & Querying!')
}) // 

app.get('/hello/:name', (req, res) => { // listen for hello, request, response. on request hello "name", responds with Hello "name"
    res.send('Hello ' + req.params.name); // req.params -  property is an object containing properties mapped to the named route “parameters”
})

app.get('/api/movies', (req, res) => {

    const movies = [ // movies JSON array
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        }
    ];

    res.status(200).json({ // set the HTTP status for the response. 
        movies: movies, // send movies json
        message: 'Here is your data' //message added to end of API
    })
})

app.get('/test', (req, res) => { // function routes the HTTP GET Requests to the path
    res.sendFile(__dirname + '/index.html') // send file html. direct name to url
})

app.get('/name', (req, res) => { // data as part of the URL. 
    console.log('/name route point');
    console.log(req.query.firstname + ' ' + req.query.lastname); // req.query - property is an object containing the property for each query string parameter in the route
    res.send('Hello ' + req.query.firstname + ' ' + req.query.lastname); // pulls parameters out of url
})

app.post('/name', (req, res) => { // set up to listen for post request, URL doesnt contain the data, data contained in body
    res.send('Hello ' + req.body.firstname + ' ' + req.body.lastname); // varables from the body. req.body -  contains key-value pairs of data submitted in the request body
})

app.listen(port, () => { // app listen at port 4000. used to bind and listen the connections on the specified host and port
    console.log(`Example app listening at http://localhost:${port}`)
})