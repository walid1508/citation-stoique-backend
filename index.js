require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

connectDB()

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')))

// default route 
app.use('/', require('./routes/root'))

// quote route
app.use('/api/quote', require('./routes/quoteRoutes'))

// Handle 404
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(port, () => console.log(`Server running on port ${port}`))
})