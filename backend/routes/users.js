const router = require('express').Router();
let User = require('../models/user.model');

// This is our first route, and our First end point that handles incoming http request.
// The first endpoint handles http get request .get
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// The second endpoint here handles http post request .post. at the end of that, the new user is saved to the database with the save method
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err ));
});

module.exports = router;