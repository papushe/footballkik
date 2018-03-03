const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const container = require('./container');

container.resolve(function (users, _) {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://pap:pap@ds251988.mlab.com:51988/footballkik');

    const app = setupExpress();

    function setupExpress() {
        const app = express();
        const server = http.createServer(app);

        server.listen(4000, function () {
            console.log(`Listening on port 4000`);
        });

        configureExpress(app);

        //setup router
        const router = require('express-promise-router')();

        users.setRouting(router);

        app.use(router);
    }


    function configureExpress(app) {
        require('./passport/passport-local');
        require('./passport/passport-facebook');


        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(validator());
        app.use(session({
            secret: 'thisIsASecretKey',
            resave: true,
            // saveInitialized:true,
            saveUninitialized: true,
            store: new mongoStore({mongooseConnection: mongoose.connection})
        }));

        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());

        app.locals._ = _;
    }
});

