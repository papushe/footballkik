'use strict';

module.exports = function (_, passport, User) {

    return {
        setRouting: function (router) {
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);

            router.get('/auth/facebook', this.getFacebookLogin);
            router.get('/auth/facebook/callback', this.facebookLogin);

            router.post('/', User.loginValidation, this.postLogin);
            router.post('/signup', User.signUpValidation, this.postSignUp);
        },

        indexPage: function (req, res) {
            const errors = req.flash('error');
            return res.render('index', {
                title: 'footballkik | login',
                messages: errors,
                hasErrors: errors.length > 0
            });
        },
        postLogin: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),
        getSignUp: function (req, res) {
            const errors = req.flash('error');
            return res.render('signup', {
                title: 'footballkik | SignUp',
                messages: errors,
                hasErrors: errors.length > 0
            });
        },
        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        getFacebookLogin: passport.authenticate('facebook', {
            scope:'email'
        }),
        facebookLogin: passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        homePage: function (req, res) {
            return res.render('home');
        }
    }
};