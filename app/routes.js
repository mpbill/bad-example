const express = require('express');
const router = express.Router();

const people = [
    {id: 0, name: 'matt'},
    {id: 2, name: 'mark'},
    {id: 3, name: 'michael'},
    {id: 1, name: 'jimmy'}
];

router.get('/', (req, res) => {
    console.log(req.query);
    res.sendFile(__dirname +  '/index.html');
});

router.get('/people', (req, res) => {
    res.send(people.find((i) => i.id === parseInt(req.query['id'])).name);
});

router.get('/timer/:sec', (req, res) => {
    const sec = parseInt(req.params.sec);
    const ms = sec * 1000;
    setTimeout(() => {
        res.send(`it has been ${sec} seconds`);
    }, ms)
});

module.exports = router;
