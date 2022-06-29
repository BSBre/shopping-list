//required packages
const express = require('express');
var http = require('http');
const firebase = require('./firebaseInit');
const db = firebase.firestore()
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");
    res.header("Access-Control-Expose-Headers", "x-access-token,x-refresh-token")
    next();
})

//cors
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./routes/routes')

app.use('/users', routes)

//entry point of application
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to shoppingList app' })
})

var httpServer = http.createServer(app);
httpServer.listen(3080, () => {
    console.log('http running on port 3080')
});

