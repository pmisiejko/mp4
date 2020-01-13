const express = require('express');
const router = express.Router();
const Produkt = require('../model/produkt');

router.get('/', (req, res, next) => {
    const produkts = Produkt.list();
    res.json(produkts);
});
router.get('/:produktId', (req, res, next) => {
    const produktId = req.params.produktId;
    const produkt = Produkt.details(produktId);
    res.json(produkt);
});
router.post('/', (req, res, next) => {
    const newProdukt = req.body;
    console.log(`router post /produkts data: ${JSON.stringify(newProdukt)}`);
    const createdProdukt = Produkt.add(newProdukt);
    res.status(201).json(createdProdukt);
});
router.put('/:produktId', (req, res, next) => {
    const produktData = req.body;
    const produktId = req.params.produktId;
    produktData.id = produktId;
    Produkt.edit(produktData);
    res.status(204).end();
});
router.delete('/:produktId', (req, res, next) => {
    const produktId = req.params.produktId;
    console.log(`delete produktId: ${produktId}`);
    Produkt.delete(produktId);
    res.status(204).end();
});

module.exports.route = router;