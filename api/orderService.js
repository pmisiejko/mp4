const express = require('express');
const router = express.Router();
const Order = require('../model/order');

router.get('/', (req, res, next) => {
    const orders = Order.list();
    res.json(orders);
});
router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    const order = Order.details(orderId);
    res.json(order);
});
router.post('/', (req, res, next) => {
    const newOrder = req.body;
    console.log(`router post /orders data: ${JSON.stringify(newOrder)}`);
    const createdOrder = Order.add(newOrder);
    res.status(201).json(createdOrder);
});
router.put('/:orderId', (req, res, next) => {
    const orderData = req.body;
    const orderId = req.params.orderId;
    orderData.id = orderId;
    Order.edit(orderData);
    res.status(204).end();
});
router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    console.log(`delete orderId: ${orderId}`);
    Order.delete(orderId);
    res.status(204).end();
});

module.exports.route = router;