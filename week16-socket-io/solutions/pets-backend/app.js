var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Adding extra modules
var bodyParser = require("body-parser");
var cors = require('cors');

// adding the new router
var animalRouter = require('./routes/animal.routes');
var userRouter = require('./routes/user.routes');

// Creating the chat socket
var chatSocket = require('socket.io')(
    {
        cors: {
            origins: ['http://localhost:8080']
        }
    }
);
// Importing the chat controller
var chatController = require('./controllers/chat.controller');

var chat = chatSocket
    .of('/chat') //We are defining an endpoint for the chat
    .on('connection', function (socket) {
        chatController.respond(chat,socket);
    });


var app = express();

// adding cors module
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Database connection code
const db = require("./models");
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

// Configuring the main routes
app.use('/petshop', animalRouter);
app.use('/petshop', userRouter);
// new routes for authentication
require('./routes/auth.routes')(app);
require('./routes/test.routes.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, chatSocket };