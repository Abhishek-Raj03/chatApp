// const { appendFile } = require("fs");

const socket=io('http://localhost:3001')

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');

var audio=new Audio('sound.mp3')

const append=function(message,position){
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    messageContainer.scrollTop=messageContainer.scrollHeight;
    if(position=='left'){
        audio.play();
    }
}

const named=prompt('Enter your name to join');
socket.emit('new-user-joined',named);

socket.on('user-joined',function(name){
    append(`${name} joined the chat`,'right');
})

form.addEventListener('submit',function(e){
    e.preventDefault();
    const message=messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
})
socket.on('receive',function(data){
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('leave',function(name){
    append(`${name} left the chat`,'left');
})