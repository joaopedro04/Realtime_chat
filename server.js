const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = [];

io.on('connection', (socket) => {
    console.log(' ');
    console.log('############################');
    console.log('Socket conectado');
    console.log('User_id => ', socket.id);

    socket.emit('previousMessages', messages);

    socket.on('sendObj', data =>{
        console.log('socket.on recebe --->', data);
        // let messages = [];
        messages.push(data);
        console.log('array de mensagens ---->', messages);

        socket.broadcast.emit('receivedMessages', data);
    });
});


server.listen(3000);
console.log('Servidor ONLINE em http://localhost:3000');
console.log('é us guri');