const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/#/', (req, res) => {
    res.render('index.html');
});

io.on('connection', sockets => {
    io.socket.get();
    console.log('Socket conectado!!!');
});



server.listen(3000, () => {
    console.log(' ');
    console.log("###### o server está rodando em https://localhost:3000 #######");
});