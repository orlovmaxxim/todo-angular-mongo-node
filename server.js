let express = require('express');
let app = express();
let mongoose = require('mongoose');

// log requests to the console (express4)
let morgan = require('morgan');
// pull information from HTML POST (express4)
let bodyParser = require('body-parser');
// simulate DELETE and PUT (express4)
let methodOverride = require('method-override');


// data base config and connection
let configDB = require('./config/database.js');    
mongoose.connect(configDB.url, { useMongoClient: true });

app.use(express.static(__dirname + '/public'));

// log every request to the console    
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(methodOverride());

require('./src/routes.js')(app);

// listen node server (node server.js)
app.listen(8080);
console.log("App listening on port 8080");