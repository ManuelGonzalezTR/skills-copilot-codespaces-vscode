// Create web server
const express = require('express');
const app = express();
// Create an instance of the express server
const server = require('http').createServer(app);
// Create a socket instance
const io = require('socket.io')(server);
// Create a port
const port = 3000;
// Create a variable to store comments
const comments = [];
// Create a function to send comments
function sendComments(socket) {
    // Emit the comments to the client
    socket.emit('comments', comments);
}
// When the client connects
io.on('connection', (socket) => {
    // Send the comments to the client
    sendComments(socket);
    // When the client sends a comment
    socket.on('comment', (data) => {
        // Add the comment to the comments array
        comments.push(data);
        // Send the comments to the client
        sendComments(socket);
    });
});
// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
