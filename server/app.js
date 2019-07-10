const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const auth = require("./routes/api/auth.js");
const register = require("./routes/api/register.js");
const profile = require("./routes/api/profile.js");


//connect to MongoDB
mongoose.connect('mongodb://abc123:abc123@ds161024.mlab.com:61024/reg_auth', { useNewUrlParser: true, useCreateIndex: true });
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connect to db succes");

});

//Middleware
// parse incoming requests
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  name: 'sid',  
  saveUninitialized: false,
  resave: false,
  secret: 'work hard',
  store: new MongoStore({
    mongooseConnection: db
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    sameSite: true,
    secure: false

  }
}));
app.use('/api/auth', auth);
app.use('/api/register', register);
app.use('/api/profile', profile);

// Handle production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));

  //Handle SPA
  app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

