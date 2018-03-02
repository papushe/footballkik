'use strict';

const passport = require('passport');
const User = require('../models/user');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {

    User.findOne({'email': email}, (err, user) => {

        if (err) {
            console.log('findOne err:' + err);
            return done(err);
        }
        if (user) {
            console.log('Have user?:' + user);
            return done(null, false, req.flash('error', 'User with email already exist'));
        }
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save((err, newUser) => {
            console.log('err to save: ' + err);
            console.log('newUser to save: ' + newUser);
            done(null,newUser);
        });

    });

}));
//
// passport.use('local.login', new localStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
// }, (req, email, password, done) => {
//
//     User.findOne({'email': email}, (err, user) => {
//
//         if (err) {
//             return done(err);
//         }
//         const messages = [];
//         if (!user || user.validUserPassword(password)) {
//             messages.push('Email Does not Exist or Password is invalid');
//             return done(null, false, req.flash('error', messages));
//         }
//         return done(null, user);
//     })
//
// }));