const express = require('express'),
    server = express(),
    http = require('http').Server(server),
    port = 3001;

server.use(express.json());

server.get('/', (req, resp)=>{
    resp.send("Hola Mundo con Express desde Nodejs");
});
server.get('/usuarios/nuevo', (req, resp)=>{
    resp.sendFile(__dirname + '/index.html');
});
server.post('/usuarios/save', (req, resp)=>{
    console.log( req.body);
});
http.listen(port, ()=>{
    console.log('Server corriendo en el puerto ', port);
});