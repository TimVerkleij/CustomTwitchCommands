const router = require('express').Router();
var NoSQL = require('nosql');
var db = NoSQL.load('./local.db.nosql');


router.get('/customcommands/queue/', (req, res) => {
    db.find().make(function(filter) {
        filter.callback(function(err, response) {
            var answer = "1v1 queue: "
            if (response.length >= 1) {
                response.forEach(myFunction);

                function myFunction(value) {
                    answer = answer + value.user + " - "
                }
            } else {
                answer = "The queue is empty. Redeem a 1v1 with your channel points and wait for one of the mods to add you to the queue."
            }

            res.send(answer)
        });
    });
});

router.get('/customcommands/adduser/:data', (req, res) => {
    var user = req.params.data;
    if (user.charAt(0) == "@") {
        user = user.slice(0, 0) + user.slice(1);
    }
    db.insert({
        user
    })
    res.send(user + " has been added to the list")
});

router.get('/customcommands/deluser/:data', (req, res) => {
    var user = req.params.data;
    if (user.charAt(0) == "@") {
        user = user.slice(0, 0) + user.slice(1);
    }
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




router.get('/customcommands/penis/:data', (req, res) => {
    var user = req.params.data;
    var r = false;
    if (user == 'silvr' || user == 'Silvrback' || user == 'SilvrbackRL' || user == 'blastbucketgaming')
        r = '13';
    if (r)
        res.send(user + ' has a penis length of ' + r + ' inches!! ' + user + ' has the biggest dick!');
    else
        res.send(user + ' has a penis length of ' + Math.floor(Math.random() * 11 + 1) + ' inches');
});


module.exports = router;