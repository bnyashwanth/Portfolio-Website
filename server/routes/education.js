// backend/routes/education.js

const router = require('express').Router();
let Education = require('../models/education.model');

router.route('/').get((req, res) => {
    Education.find()
        .then(education => res.json(education))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;