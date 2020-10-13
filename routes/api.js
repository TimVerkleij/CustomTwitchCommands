const router = require('express').Router();
var NoSQL = require('nosql');
var db = NoSQL.load('./local.db.nosql');
var quickChatDatabase = NoSQL.load('./quickchats.nosql');


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
        user = user.slice(1).toLowerCase();
    } else {
        user.toLowerCase()
    }
    db.insert({
        user
    })
    res.send(user + " has been added to the list")
});

router.get('/customcommands/deluser/:data', (req, res) => {
    var user = req.params.data;
    if (user.charAt(0) == "@") {
        user = user.slice(1).toLowerCase();
    } else{
        user.toLowerCase()
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


router.get('/customcommands/quickchat', (req, res) => {
    quickChatDatabase.find().make(function(filter) {
        filter.callback(function(err, response) {
            res.send(response[Math.floor(Math.random() * response.length)])
        });
    });
})


router.get('/customcommands/deluser/', (req, res) => {
    res.send("Please enter a user to remove from the queue")
});

router.get('/customcommands/adduser/', (req, res) => {
    res.send("Please enter a user to add to the queue")
});




router.get('/customcommands/penis/:data', (req, res) => {
    var user = req.params.data;
    if (user.charAt(0) == "@") {
        user = user.slice(1);
    }
    var r = false;
    if (user == 'silvr' || user == 'Silvrback' || user == 'SilvrbackRL' || user == 'blastbucketgaming')
        r = '13';
    if (r)
        res.send(user + ' has a penis length of ' + r + ' inches!! ' + user + ' has the biggest dick!');
    else
        res.send(user + ' has a penis length of ' + Math.floor(Math.random() * 11 + 1) + ' inches');
});


router.get('/customcommands/mrpoop/penis/:data', (req, res) => {
    var user = req.params.data;
    if (user.charAt(0) == "@") {
        user = user.slice(1);
    }
    const r = Math.floor(Math.random() * 10)
    if (r == 0)
        res.send("I'm not a microbiologist Kappa")
    else if (r <= 5)
        // res.send('Hold on, give me a second. I gotta get my magnifying glass for this one Kappa \n ' + user + ' has a wopping ' + r + ' inches LUL')
        res.send(`What is √${r**2}? Yea that's right, it's the size of your small ${r} inch dick.`)
    else
        res.send(`lmao, only ${r} inches, mine is bigger than ${user}'s.`)
});



module.exports = router;