const router = require('express').Router();
const fetch = require('node-fetch');
const NoSQL = require('nosql');
const db = NoSQL.load('./local.db.nosql');
const quickChatDatabase = NoSQL.load('./quickchats.nosql');
const rankDatabase = NoSQL.load('./rankDatabase.nosql');

router.get('/customcommands/queue/', (req, res) => {
    db.find().make(function(filter) {
        filter.callback(function(err, response) {
            let answer = "1v1 queue: "
            if (response.length >= 1) {

                for (let i = 0; i < response.length; i++) {
                    let user = response[i].user;
                    if(i !== response.length - 1) {
                        answer = answer + user + " - "
                    } else {
                        answer = answer + user
                    }
                }

            } else {
                answer = "The queue is empty. Redeem a 1v1 with your channel points and wait for one of the mods to add you to the queue."
            }

            res.send(answer)
        });
    });
});

router.get('/customcommands/adduser/:data', (req, res) => {
    var user = req.params.data.toLowerCase();
    if (user.charAt(0) == "@") {
        user = user.slice(1);
    }
    db.insert({
        user
    })
    res.send(user + " has been added to the list")
});

router.get('/customcommands/deluser/:data', (req, res) => {
    var user = req.params.data.toLowerCase();
    if (user.charAt(0) == "@") {
        user = user.slice(1);
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

router.get('/customcommands/rank', (req, res) => {
    rankDatabase.find().make(function(filter) {
        filter.callback(function(err, response) {
            res.send(response[0])
        });
    });

    getRank()

    async function getRank() {
        let ranks = await fetch('https://api.yannismate.de/rank/epic/tv-Mr_Poop?playlists=ranked_1v1,ranked_2v2,ranked_3v3')
        let body = await ranks.text();
        rankDatabase.update(body)
    }
})


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


router.get('/customcommands/mrpoop/penis/old/:data', (req, res) => {
    var user = req.params.data;
    if (user.charAt(0) == "@") {
        user = user.slice(1);
    }
    const r = Math.floor(Math.random() * 10)
    const q = Math.floor(Math.random() * 234) + 22
    if (r == 0)
        res.send("I'm not a microbiologist Kappa")
    else if (r <= 5)
        // res.send('Hold on, give me a second. I gotta get my magnifying glass for this one Kappa \n ' + user + ' has a wopping ' + r + ' inches LUL')
        // res.send(`What is √${r**2}? Yea that's right, it's the size of your small ${r} inch dick.`)
        res.send(`What is ${r*q} divided by ${q}? It's the size of your small ${r} inch dick LUL`)
    else
        res.send(`lmao, only ${r} inches, mine is bigger than ${user}'s.`)
});

router.get('/customcommands/mrpoop/penis/:data', (req, res) => {
    var user = req.params.data;
    if (user.charAt(0) == "@") {
        user = user.slice(1);
    }
    const r = Math.floor(Math.random() * 10)
    if(user.toLowerCase() === "b4ntony" || user.toLowerCase() === "ant")
        return res.send(`A tiny dick for a tiny man 🐜`)
    if (r == 0)
        res.send(`Some things are better to be kept secret. Nobody wants to know how short ${user}'s weener is.`)
    else if (r <= 5)
        res.send(`That is one tiny ass penis you got there ${user}, only ${r} inches Kappa`)
    else 
        res.send(`Damnn bro, you're packin' SeemsGood`)
})

router.get('/customcommands/stitch', (req, res) => {
    let randomNumber = Math.floor(Math.random() * 10) + 1
    if(randomNumber >= 6){
        res.send(`BlastBucket rates you a ${Math.floor(Math.random() * 10) + 1}/10 SeemsGood`)
    } else {
        res.send(`BlastBucket rates you a ${Math.floor(Math.random() * 10) + 1}/10 NotLikeThis`)
    }
})


module.exports = router;