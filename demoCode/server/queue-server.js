
'use strict';

const uuid = require('uuid').v4;
const io = require('socket.io')(3001);

const messages = {};

io.on('connection', (socket) => {
  console.log('Connected', socket.id);
});

io.of('/database', (socket) => {


  socket.on('received', payload => {
    let { messageID, event, clientID} = payload;
    delete messages[event][clientID][messageID];
  });

  socket.on('getall', (data)=> {
    try{
      let { event, clientID} = data;
      for (const messageID in messages[event][clientID]) {
        let payload = messages[event][clientID][messageID];
        console.log('sending to', clientID, event);
        io.of('database').to(clientID).emit(event, {messageID, payload});
      }
    }
    catch(e) {console.error(e);}
  });

  socket.on('subscribe', payload => {
    let { event, clientID} = payload;

    if (!messages[event]) { messages[event] = {}; }
    if (!messages[event][clientID]) { messages[event][clientID] = {}; }

    socket.join(clientID);

  })


  //Database Event Handlers
  socket.on('create', (message) => handleEvent('create', message));
  socket.on('update', (message) => handleEvent('update', message));
  socket.on('delete', (message) => handleEvent('delete', message));

  //events are all veeeeery much the same... other than name
  //generalize the handler to handle all events
  function handleEvent (event, message){
    let messageID = uuid();

    for (const subscriber in messages[event]){
      messages[event][subscriber][messageID] = message.payload;
    }

    socket.broadcast.emit( event, {messageID, payload: message.payload});
  }

});