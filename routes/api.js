const router = require('express').Router();
var NoSQL = require('nosql');
var db = NoSQL.load('./local.db.nosql');


router.get('/api/', (req, res) => {
    const obj = {
        foo: 'bar'
    };
    res.json(obj);
});


module.exports = router;