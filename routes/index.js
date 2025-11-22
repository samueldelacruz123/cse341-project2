const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.send('Welcome to Project 2');
});

router.use('/', require('./swagger'));

router.use('/students', require('./student'));

router.use('/teachers', require('./teacher'));

router.get('/login', passport.authenticate('github'));

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;