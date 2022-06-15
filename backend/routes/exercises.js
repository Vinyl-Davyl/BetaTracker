// Requiring our router and our model
const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// If its a root url that has ../exercises/.. it performs this,this is the get endpoint
router.route('/').get((req, res) => {
    Exercise.find()
        // Returns all exercises as then a  json format
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400). json('Error: ' + err));
});


// To check, In our postman we can add
// {
//  "username": "dave",
//  "description": "true"...
// } under a POST request, once sent, it gives Exercise added
router.route('/add').post((req, res) => {
    // Gets all information from the body
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    // Creates new exercise
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    // Exercise added
    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get request
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Delete request
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
  
module.exports = router;