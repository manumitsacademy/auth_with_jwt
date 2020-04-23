var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
var Student = require('./Student');

// CREATES A NEW Student
router.post('/', VerifyToken, function (req, res) {
    Student.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            location: req.body.location,
            city: req.body.city,
            email: req.body.email
        }, 
        function (err, student) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(student);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/',VerifyToken, function (req, res) {
    Student.find({}, function (err, Student) {
        if (err) return res.status(500).send("There was a problem finding the Students.");
        res.status(200).send(Student);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;