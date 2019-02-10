const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();        // create new express app 

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname+'/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/',(req, res) => {
    // res.send({
    //     name: "Ashish",
    //     country: "India",
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello World!'
    })
});         // Set up a register a handler for http get request 

app.get('/about', (req, res) => {
    // res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request',
    })
})
app.listen(9000, () => {
    console.log('Server is up on port 3000')
}
);