const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3010;

const TAX_RATE = 5;
const DISCOUNT_PERCENTAGE = 10;
const LOYALTY_RATE = 2;

app.use(express.static('static'));
app.use(cors())
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice ?? 0);
  let cartTotal = parseFloat(req.query.cartTotal ?? 0);
  let total = newItemPrice + cartTotal;
  res.send(total.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal ?? 0);
  let isMember = req.query.isMember ?? 'false';

  if (isMember == 'true') {
    cartTotal = cartTotal - (cartTotal * DISCOUNT_PERCENTAGE) / 100;
  }

  res.send(cartTotal.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance ?? 0);
  let days = 0;
  let divisor = 50;

  if (shippingMethod === 'express') {
    divisor = 100;
  }

  days = Math.floor(distance / divisor);
  res.send(days.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let cost = weight * distance * 0.1;

  res.send(cost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount ?? 0);
  res.send((LOYALTY_RATE * purchaseAmount).toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal ?? 0);
  let tax = (cartTotal * TAX_RATE) / 100;

  res.send(tax.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
