const EventEmitter = require('events');

class MyEmitter extends EventEmitter{}

const myEmitter = new MyEmitter();

myEmitter.on('event',(a,b) => {
   setImmediate(() => {
   	console.log("这个是异步的");
   })
   console.log('111');
});

myEmitter.emit('event');