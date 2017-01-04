const http = require('http');
const fs = require('fs');
const path = require('path');

const viewsPath = '/views';





function handleBadRequest(req, res) {
    let filePromise = new Promise((resolve, reject) => {
        let errTemplatePath = path.join(__dirname, viewsPath, '/error.html');
        fs.readFile(errTemplatePath, (err, fileContent) => {
            if (err) {
                reject(err);
            }
            resolve(fileContent);
        });
    });

    filePromise.then((fileContent) => {
        res.writeHead(400, {
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(fileContent)
        });
        res.end(fileContent.toString('utf-8'));
    }, (err) => {
        console.error(err);
        res.end();
    });


}


function handleNotFound(req, res) {
    let filePromise = new Promise((resolve, reject) => {
        let notFoundTemplatePath = path.join(__dirname, viewsPath, '/404.html');
        fs.readFile(notFoundTemplatePath, (err, fileContent) => {
            if (err) {
                reject(err);
            }
            resolve(fileContent);
        });
    });

    filePromise.then((fileContent) => {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(fileContent)
        });
        res.end(fileContent.toString('utf-8'));
    }, (err) => {
        console.error(err);
        res.end();
    });

}


function requestHandler(req, res) {

    if (req.method !== 'GET') {
        handleBadRequest(req, res);
    }

    switch (req.url) {
        case '/':
            fs.readFile(path.join(__dirname, viewsPath, '/index.html'), (err, data) => {
                if (err) {
                    throw err;
                }
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Content-Length': Buffer.byteLength(data)
                });
                res.end(data.toString('utf-8'));
            });
            break;
            // For Google Chrome
        case '/favicon.ico':
            res.statusCode = 404;
            res.statusMessage = 'Not found';
            res.end();
            break;
        case '/public/client.js':
            fs.readFile(path.join(__dirname, '/public/client.js'), (err, data) => {
                if (err) {
                    throw err;
                }
                res.writeHead(200, {
                    'Content-Type': 'application/javascript',
                    'Content-Length': Buffer.byteLength(data)
                });
                res.end(data.toString('utf-8'));
            });
            break;
        case '/watch':
            // sse

            break;

        default:
            handleNotFound(req, res);
    }



}







http.createServer(requestHandler).listen(process.env.PORT || 8080, () => console.log('Server listening...'));
