const express = require('express');
const app = express();
const fs = require('fs');

const WATCH_FOLDER = __dirname + '/src';
const PORT = 8080;



app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



app.get('/watch', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    const params = {
        persistent: true,
        recursive: true,
        encoding: 'utf8'
    };

    fs.watch(WATCH_FOLDER, params, (eventType, filename) => {
        let data = `event:${eventType}\ndata:timestamp ${Date.now()}\ndata:filename ${filename}\n\n`;
        res.write(data);
    });

});


app.listen(PORT, () => console.log('Server listening...'));
