const router = require('express').Router();

const NoSQL = require('nosql');
const db = NoSQL.load('./local.queue.nosql');

router.get('/v2/list/', (req, res) => {
    db.find().make(function (filter) {
        filter.callback(function (err, response) {
            let answer = "Next players in the queue: "

            let queueLength = response.length > 3 ? 3 : response.length

            if (queueLength >= 1) {

                for (let i = 0; i < queueLength; i++) {
                    let user = response[i].user;
                    if (i !== queueLength - 1) {
                        answer += user + ", "
                    } else {
                        answer += user
                    }
                }

            } else {
                answer = "The queue is empty. Use !join to join the queue."
            }

            res.send(answer)
        })
    })
})

router.get('/v2/queue/', (req, res) => {
    db.find().make(function (filter) {
        filter.callback(function (err, response) {
            res.send(`There ${response.length == 1 ? 'is':'are'} ${response.length} player${response.length == 1 ? '':'s'} in the queue.`)
        })
    })
})

router.get('/v2/queue/join/:user', (req, res) => {
    var user = req.params.user.toLowerCase();
    db.insert({
        user
    })
    res.send(user + " has joined the queue")
})

router.get('/v2/queue/leave/:user', (req, res) => {
    var user = req.params.user.toLowerCase();
    db.remove()
        .where('user', '=', user)
        .callback(function (error, found) {
            if (found) {
                res.send(user + " has left the queue")
            } else {
                res.send("That user was not in the queue")
            }
        })
})

router.get('/v2/queue/next/', (req, res) => {
    const amount = parseInt(req.query.amount)
    const skips = amount ? (
        amount > 3 ? 3 : (
            amount < 0 ? 1 : amount
        )
    ) : 1

    const users = []
    db.find().make(function (filter) {
        filter.take(skips)
        filter.callback(function (err, response) {
            response.forEach(user => {
                users.push(user.user)
            })

            db.remove()
                .in('user', users)
                .callback(function () {
                    res.send(`The following users were removed from the queue: ${users.join(', ')}`)
                })
        })
    })
})


module.exports = router;