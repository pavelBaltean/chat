//при инициализации программы прописали
//этот фаил
let express = require('express');
let app=express();
let server=require('http').createServer(app);
let io=require('socket.io').listen(server);
 
server.listen(3000);

app.get('/',function(request,response){
    response.sendFile(__dirname+'/index.html');
});

 user=[];//хранит всех пользователей с которыми взаимодействуем
 connections=[];//все подключения которые есть на данный момень  
 
 io.sockets.on('connection',function(socket){
     console.log("Successeful connected");
     connections.push(socket);//добавляет элемент в массив
     
     socket.on('disconnect',function(data){
         connections.splice(connections.indexOf(socket),1);
         console.log("Disconnected");
     });

     socket.on('send mess',function(data){
          io.sockets.emit('add mess',{mess:data.mess,name:data.name,className: data.className});
          //передается текст полученный от странички
          
     });
 });