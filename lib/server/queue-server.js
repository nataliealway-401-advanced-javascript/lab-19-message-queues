'use strict';

const io = require('socket.io')(3001);

const queues = {
  flowers: [],
  acme: [],
};

io.on('connection', socket => {
  console.log(`Connected on ${socket.id}`);
});

const deliveries = io.of('/deliveries');

deliveries.on('connection', socket => {
  console.log('Delivery service', socket.id );

  socket.on('join', room => {    
    console.log('joined', room);
    socket.join(room);    
    deliveries.to(room).emit('deliveries in queue', queues[room]);    
  });

  

  socket.on('received', payload => {    
  //acme
  //flowers
  });


  socket.on('delivered', payload => {
  //acme
  //flowers
  });
});