// node server which will handle socket io connections
const express=require('express');
const app=express();
const server=require('http').createServer(app);
const io=require('socket.io')(server,{cors:{origin:"*"}})

const users={}



server.listen(3001,()=>{
    console.log('server is running at port 3001')
})

io.on('connection',function(socket){
    console.log('user connected',socket.id)
    socket.on('new-user-joined',function(name){
        console.log("New user joined",name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })

    socket.on('send',function(message){
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    }) 

    socket.on('disconnect',function(message){
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    }) 
})