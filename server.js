// Setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Konfiguracja
mongoose.connect('mongodb://kalix:kalii1@proximus.modulusmongo.net:27017/uv4omAmi');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(methodOverride());

// Model
var book = mongoose.model('book', {Title: String, Description: String, Author: String, ISBN: String, Image: String});

// API
// Pobranie wszystkich ksiazek
app.get('/api/books', function (req, res) {
    book.find(function (err, books) {
        if (err)
            res.send(err);

        res.json(books);
    });
});

app.post('/api/books', function (req, res) {
    book.create({
        Title: req.body.Title,
        Description: req.body.Description,
        Author: req.body.Author,
        ISBN: req.body.ISBN,
        Image: req.body.Image
    }, function (err) {
        if (err)
            res.send(err);

        book.find(function (err, books) {
            if (err)
                res.send(err);

            res.json(books);
        });
    });
});

app.delete('/api/books/:book_id', function (req, res) {
    book.remove({
        _id: req.params.book_id
    }, function (err) {
        if (err)
            res.send(err);

        book.find(function (err, books) {
            if (err)
                res.send(err);

            res.json(books);
        });
    });
});

// App
app.get('*', function (req, res) {
    res.sendFile('./public/index.html');
});

//=================
app.listen(8080);
console.log('App listening on port 8080');



