'use strict'

var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var fs = require("fs");

var User = require('./models/user.js');

var app = express();

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');

// console.log('Yeah..... ', process.env);
// var path = require('path'); 

fs.stat('config.js', function(err, stat) {

	// console.log('yeah ', err);

    if(err == null) {
    	const config = require('../config');
	    const conf_vars = config.get_config_vars();
	    process.env.MONGODB_URI = conf_vars.env_database;
	    process.env.S3_BUCKET_NAME = conf_vars.env_bucket;
		process.env.AWS_ACCESS_KEY_ID = conf_vars.env_aws_access_key;
		process.env.AWS_SECRET_ACCESS_KEY = conf_vars.env_aws_secret_key;
    }

    /** Database stuff **/

	mongoose.Promise = global.Promise;
	// mongodb connection

	mongoose.connect(process.env.MONGODB_URI);

	// mongoose.connect("mongodb://localhost:27017/zmot");

	var db = mongoose.connection;

	// mongo error
	db.on('error', console.error.bind(console, 'connection error:'));

	app.use(session({
		secret: 'secret of some sort',
		resave: true,
		saveUninitialized: false,
		store: new MongoStore({
			mongooseConnection: db
		})
	}));

	// make user id available in templates
	app.use(function(req, res, next){
		res.locals.currentUser = req.session.userId;
		next();
	});

	/** Routes **/

	// main routes
	var routes = require('./routes/main.js');
	app.use('/', routes);

	// admin routes
	var admin_routes = require('./routes/admin.js');
	app.use('/admin', admin_routes);

	// api routes
	var api_routes = require('./routes/api.js');
	app.use('/admin/api', api_routes);

	app.listen(process.env.PORT || 3000);

    // 	else if(err.code == 'ENOENT') {
    //     // file does not exist
    //    // fs.writeFile('log.txt', 'Some log\n');
    // } else {
    //     console.log('Some other error: ', err.code);
    // }

});

// path.exists('config.js', function(exists) { 
// 	if (exists) { 
//     	console.log('config exists'); 
//   	}else{
//   		console.log('config does not exists');
//   	}
// });

