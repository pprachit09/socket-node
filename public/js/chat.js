//make connection
var socket = io.connect('http://localhost:7878');

//define variables for query
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    typing = document.getElementById('typing');

//Emit events

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
    message.value = '';
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

//Listen for new message from server
socket.on('chat', function(data){
    typing.innerHTML = '';
    output.innerHTML += "<p><strong>"+data.handle+":</strong>"+data.message+"</p>"; 
});

//Listen for typing activity
socket.on('typing', function(data){
    typing.innerHTML = "<p><em>"+ data +" is typing a message...</p></em>"
});