const express = require('express'),
    server = express(),
    http = require('http').Server(server),
    io = require('socket.io')(http),
    { MongoClient } = require('mongodb'),
    url = 'mongodb://127.0.0.1:27017/',
    dbname = 'chatUGB',
    client = new MongoClient(url),
    port = 3001;

async function conectarBD(){
    await client.connect();
    return client.db(dbname);
}
server.use(express.json());

server.get('/', (req, resp)=>{
    resp.send("Hola Mundo con Express desde Nodejs");
});
server.get('/usuarios/nuevo', (req, resp)=>{
    resp.sendFile(__dirname + '/index.html');
});
server.get('/usuarios/listar', async (req, resp) => {
    let db =  await conectarBD(),
        collection = db.collection('usuarios'),
        usuarios = await collection.find().toArray();
    resp.send(usuarios);
});
server.post('/usuarios/save', async(req, resp)=>{
    let db = await conectarBD(),
        collection = db.collection('usuarios');
    collection.insertOne(req.body);

    console.log( req.body );
    resp.send( req.body );
});
http.listen(port, ()=>{
    console.log('Server corriendo en el puerto ', port);
});