const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Welcome to Project 2');
});

router.use('/students', require('./student'));

router.use('/teachers', require('./teacher'));

module.exports = router;