const { allReady } = require('../utils/helper');
const { findRoom } = require('../services/room');

// Set player's ready status to true
const setReady = (room, id) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    const player = gameroom.players.find((user) => user.id === id);
    player.ready = true;

    return gameroom;
};

// Check if all players are ready
const allPlayersReady = (room) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;
    return allReady(gameroom);
};

// Remove the player from the room
const removePlayer = (id, room) => {
    const room_index = rooms.findIndex((rm) => rm.roomId === room);
    if (room_index === -1) return null;

    const players = rooms[room_index].players;
    const player_index = players.findIndex((user) => user.id === id);
    if (player_index === -1) return null;
    const player = players.splice(player_index, 1)[0];

    const chat_index = chatrooms.findIndex((cr) => cr.roomId === room);

    // Return the color back to the room
    rooms[room_index].colors.unshift(player.color);

    // If there are no more players in the room, remove the room and chatroom from the database
    if (rooms[room_index].players.length === 0) {
        rooms.splice(room_index, 1);
        chatrooms.splice(chat_index, 1);
    }

    return player;
};

// Functions that handle the chat
// Add a message to the chatroom
const addMessage = (id, room, name, message) => {
    const chatroom = chatrooms.find((c) => c.roomId === room);
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    const player = gameroom.players.find((p) => p.id === id);

    const messageObject = {
        name: name,
        color: player.color,
        message: message,
    };

    chatroom.messages.push(messageObject);

    return chatroom.messages;
};

// Functions that handle the timer
// Reset the timer
const resetTime = (room) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    gameroom.timer = gameroom.settings.time;

    return gameroom.timer;
};

// Count down the timer by 1s
const countdown = (room) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined || allReady(gameroom)) {
        return null;
    }

    gameroom.timer -= 1;

    return gameroom.timer;
};

module.exports = {
    setReady,
    allPlayersReady,
    removePlayer,
    addMessage,
    resetTime,
    countdown
}