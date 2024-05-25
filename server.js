const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const ACTIONS = require('./src/actions');

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};
function getAllConnectedClients(roomId){
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}
 socket.on('disconnecting',()=>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
                socketId: socket.id,
                username: userSocketMap[socket.id],
            })
        })
        delete userSocketMap[socket.id];
        socket.leave();
    })

})


const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)});
