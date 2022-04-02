const fs = require('fs');

const home = (response, filePath) => {
    let filename = filePath;
    
    if (fs.statSync(filePath).isDirectory()) filename += '/index.html';

    fs.readFile(filename, (error, content) => {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(content, 'utf-8');
    });
};

const resource = (response, filePath, contentType) => {
    fs.readFile(filePath, (error, content) => {
        response.writeHead(200, {
            'Content-Type': contentType
        });
        response.end(content, 'utf-8');
    });
};

module.exports = {
    home,
    resource
};