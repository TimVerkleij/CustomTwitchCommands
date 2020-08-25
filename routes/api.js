const router = require('express').Router();
var NoSQL = require('nosql');
var db = NoSQL.load('./local.db.nosql');


router.get('/customcommands/queue/', (req, res) => {
    db.find().make(function(filter) {
        filter.callback(function(err, response) {
            var answer = "1v1 queue: "
            response.forEach(myFunction);
            function myFunction(value) {
                answer = answer + value.user + " - "
            }
            res.send(answer)
        });
    });
});

router.get('/customcommands/adduser/:data', (req, res) => {
    var user = req.params.data;
    db.insert({
        user
    })
    res.send(user + " has been added to the list")
});

router.get('/customcommands/deluser/:data', (req, res) => {
    var user = req.params.data;
    db.remove()
        .where('user', '=', user)
        .callback(function(error, found) {
            if (found) {
                 res.send(user + " has been removed from the list") 
                } else {
                    res.send("That user was not found")
                }
        });
});


router.get('/customcommands/deluser/', (req, res) => {
    res.send("Please enter a user to remove from the queue")
});

router.get('/customcommands/adduser/', (req, res) => {
    res.send("Please enter a user to add to the queue")
});



module.exports = router;