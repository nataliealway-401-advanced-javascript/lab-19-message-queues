'use strict';

const express = require('express');
const app = express();
const io = require('socket.io-client');

const deliveries = io.connect('http://localhost:3001/deliveries');

app.post('/delivery/:retailer/:code', handleDelivery);

function handleDelivery(req, res){
  const delivery = {
    retailer: req.params.retailer,
    code: req.params.code,
  };
  deliveries.emit('deliveried', delivery);
  res.status(200);
  res.send(delivery);
}

app.listen(3000, () => console.log(`Server up! listening on 3000`)),



module.exports = app;