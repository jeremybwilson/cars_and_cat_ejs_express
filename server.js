// Load the express module and store it in the variable express (Where do you think this comes from?)
const express = require("express");
const parser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3002;
// invoke express and store the result in the variable app
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));

app.use(parser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
    console.log('getting to index');
    response.render('index', { title: 'Cars page' });
});

var cars_array = [
    { name: "Car 1", image: 'car1.jpg'}, 
    { name: "Car 2", image: 'car2.jpg'}, 
    { name: "Car 3", image: 'car3.jpg'}, 
    { name: "Car 4", image: 'car4.jpg'}
];

app.get('/cars', (request, response) => {
    console.log('display all cars route');
    console.log('Checking cars_array for new data', cars_array);
    // hard-coded user data
    response.render('cars', {
        cars: cars_array, 
        title: 'Cars page' 
    });
});

var cats_array = [
    { id: 1, name: "Garfield", image: 'cat1.jpg'}, 
    { id: 2, name: "One Eyed Willie", image: 'cat2.jpg'}, 
    { id: 3, name: "Louis", image: 'cat3.jpg'}, 
    { id: 4, name: "Tigger", image: 'cat4.jpg'}
];

app.get('/cats', (request, response) => {
    console.log('getting to cats');
    // hard-coded user data
    response.render('cats', {
        cats: cats_array, 
        title: 'Cats page' 
    });
});

app.get('/cars/new', (request, response) => {
    console.log('getting to cars');
    response.render('form', {
        title: 'Add Car'
    });
});

app.post('/cars/add', (request, response) => {
    console.log('posting to cars');
    console.log('POST DATA \n\n', request.body);
    // code to insert into the db goes here
    cars_array.push(request.body);
    // redirect the user back to the root route
    response.redirect('/cars');
});


// catch 404 and forward to error handler
app.use((request, response, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, request, response, next) => {
    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};
    response.status(err.status || 500);
    // render the error page
    response.render('error', {title: 'Cars and Cats Error page'});
  });

// tell the express app to listen on port 3001, always put this at the end of your server.js file
// app.listen(3002, function() { console.log("listening on port 3002"); });         // ES5 way
app.listen(port, () => console.log(`Express server listening on port ${port}`));    // ES6 way