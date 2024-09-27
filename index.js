require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

app.use('/', express.static(path.join(__dirname, 'public')))

// default route 
app.use('/', require('./routes/root'))

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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});