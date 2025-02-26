const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let orders = [];

// Get all orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

// Create a new order
app.post('/orders', (req, res) => {
    const newOrder = {
        id: Date.now().toString(),
        customerName: req.body.customerName,
        product: req.body.product,
        quantity: req.body.quantity,
        status: req.body.status,
        date: new Date().toISOString()
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// Update an order
app.put('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }
    
    orders[orderIndex] = { ...orders[orderIndex], ...req.body };
    res.json(orders[orderIndex]);
});

// Delete an order
app.delete('/orders/:id', (req, res) => {
    orders = orders.filter(order => order.id !== req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Order Management API running at http://localhost:${port}`);
});

