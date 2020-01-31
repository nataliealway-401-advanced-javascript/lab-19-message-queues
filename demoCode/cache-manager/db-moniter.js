
'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/database');

//subscribe
socket.emit('subscribe', { event: 'create', clientID: 'cache-manager'});
socket.emit('subscribe', { event: 'update', clientID: 'cache-manager'});
socket.emit('subscribe', { event: 'delete', clientID: 'cache-manager'});

//crud event handling
socket.on('create', handleCreate);
socket.on('update', handleUpdate);
socket.on('delete', handleDelete);

//getall
socket.emit('getall', { event: 'create', clientID: 'cache-manager'});
socket.emit('getall', { event: 'update', clientID: 'cache-manager'});
socket.emit('getall', { event: 'delete', clientID: 'cache-manager'});

function handleCreate(data) {
  console.log('CREATE', data.payload);
  let something = {
    clientID: 'cache-manager',
    messageID: data.messageID,
    event: 'create'
  }
  socket.emit('received', something);
}

function handleUpdate(data) {
  console.log('UPDATE', data.payload);
  let something = {
    clientID: 'cache-manager',
    messageID: data.messageID,
    event: 'update'
  }
  socket.emit('received', something);
}

function handleDelete(data) {
  console.log('DELETE', data.payload);
}