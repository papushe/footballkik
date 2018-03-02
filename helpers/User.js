'use strict';

module.exports = function () {
    return {
        signUpValidation: (req, res, next) => {
            req.checkBody('username', 'Username is required').notEmpty();
            req.checkBody('username', 'Username Must be more than 5').isLength({min: 5});

            req.checkBody('email', 'email is required').notEmpty();
            req.checkBody('email', 'email is invalid').isEmail();

            req.checkBody('password', 'password is required').notEmpty();
            req.checkBody('password', 'password Must be more than 5').isLength({min: 5});

            req.getValidationResult()
                .then((result) => {
                    const errors = result.array();
                    const messages = [];

                    errors.forEach((error) => {
                        messages.push(error.msg)
                    });

                    req.flash('error', messages);
                    res.redirect('/signup');
                })
                .catch((err) => {
                    return next();
                })
        },
        // loginValidation: (req, res, next) => {
        //
        //     req.checkBody('email', 'email is required').notEmpty();
        //     req.checkBody('email', 'email is invalid').isEmail();
        //
        //     req.checkBody('password', 'password is required').notEmpty();
        //     req.checkBody('password', 'password Must be more than 3').isLength({min: 3});
        //
        //     req.getValidationResult()
        //         .then((result) => {
        //             const errors = result.array(),
        //                 messages = [];
        //
        //             errors.forEach((error) => {
        //                 messages.push(error.msg)
        //             });
        //
        //             req.flash('error', messages);
        //             res.redirect('/');
        //         })
        //         .catch((error) => {
        //             return next();
        //         })
        // }
    }
};