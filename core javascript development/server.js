const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = {};

wss.on('connection', (ws) => {
    const userId = uuidv4();
    users[userId] = { cursorPosition: 0, active: true };
    broadcastUserList();

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'text-update':
                broadcastMessage(ws, { type: 'text-update', content: data.content });
                break;
            case 'cursor-update':
                users[userId].cursorPosition = data.position;
                broadcastUserList();
                break;
            case 'highlight-update':
                broadcastMessage(ws, { type: 'highlight-update', userId, start: data.start, end: data.end });
                break;
            case 'user-status':
                users[userId].active = data.active;
                broadcastUserList();
                break;
        }
    });

    ws.on('close', () => {
        delete users[userId];
        broadcastUserList();
    });

    function broadcastMessage(sender, message) {
        wss.clients.forEach((client) => {
            if (client !== sender && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }

    function broadcastUserList() {
        const userList = Object.keys(users).map(userId => ({ userId, active: users[userId].active }));
        broadcastMessage(null, { type: 'user-list', userList });
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
