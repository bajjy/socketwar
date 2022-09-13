const fs = require('fs');
const path = require('path');
const routes = require('./routes');

const MIME = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.ttf': 'application/x-font-ttf',
    '.otf': 'application/x-font-opentype',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.eot': 'application/vnd.ms-fontobject',
    '.sfnt': 'application/font-sfnt',
    '.ico': 'image/x-icon',
    '.mp3': 'application/octet-stream',
    '.png': 'image/png',
    '.gltf': 'model/gltf+json',
    '.glb': 'model/gltf-binary',
};
const isAllowed = (filePath, extname, contentType) => {
    const exist = fs.existsSync(filePath);

    if (contentType && !exist) return false;
    if (!exist) return false;
    return true;
};
const errMsg = (res) => {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(404);
    res.end('ERROR request');
};

function requestListener(params) {
    const { request, response, config } = params;
    const { url, method } = request;
    const public = config.html;
    
    const filePath = public + url;
    const extname = String(path.extname(url)).toLowerCase();
    const contentType = MIME[extname];

    if (!isAllowed(filePath, extname, contentType)) return errMsg(response);
    if ((url === '/' || url === '/index.html') && method === 'GET') return routes.home(response, filePath);
    if (extname !== '.html') return routes.resource(response, filePath, contentType);

};

module.exports = requestListener;