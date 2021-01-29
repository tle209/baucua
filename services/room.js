const _ = require('lodash')
const { validateRoomSetting } = require('../utils/validator');

// Global data structures
const rooms = [];
const chatrooms = [];

// Functions that handle room events
// Create and add a new room to the server
const createRoom = (id, room, settings) => {
  const colors = [
    "#c04e48", //red
    "#4a7eac", //blue
    "#d3c56e", //yellow
    "#4e9e58", //green
    "#ca7f3e", //orange
    "#7fc7b1", //teal
    "#ca709d", //pink
    "#903c9c", //purple
  ];

  const modesCode = {
    1: "time", // Auto 
    2: "host" // host will roll dice
  };

  // const defaultSettings = { mode: "time", time: 30, rounds: 5, balance: 100000 };
  if (!id || !room || _.isEmpty(settings)) {
    return { success: false, message: 'room parameters are invalid' };
  }

  const validateResults = validateRoomSetting(settings);
  if (validateResults && validateResults.length > 0) {
    return { success: false, message: 'room setting is invalid' }
  }

  const r = {
    roomId: room,
    active: false,
    host: id,
    players: [],
    bets: [],
    dice: [],
    colors: colors,
    settings,
    round: 1,
    timer: 30,
  };

  const c = {
    roomId: room,
    messages: [],
  };

  rooms.push(r);
  chatrooms.push(c);
  return { success: true, message: 'create room successfully' }
};

/**
 * Add player to room
 * @param {*} id 
 * @param {*} name 
 * @param {*} room 
 * @param {*} isHost 
 */
const joinRoom = (id, name, room, isHost = false) => {
  const gameroom = findRoom(room)[0];
  if (gameroom === undefined) return null;

  const color = gameroom.colors.shift();

  const user = {
    id,
    name,
    color,
    room,
    total: 0,
    net: 0,
    rank: 1,
    bankrupt: false,
    ready: false,
    isHost
  };

  gameroom.players.push(user);

  return user;
};

/**
 * Check room
 * @param {*} room 
 */
const checkRoom = (room) => {
  const r = findRoom(room);
  if (r.length === 0) {
    return { success: false, message: "The room you tried to enter does not exist." };
  } else if (r.length > 0 && r[0].players.length >= 8) {
    return { success: false, message: "The room you tried to enter is already full." };
  } else if (r[0].active) {
    return { success: false, message: "The room you tried to enter has already started." };
  }
  return { success: true, message: "Found room" };
};

/**
 * Update room settings
 * @param {*} room 
 * @param {*} settings 
 */
const changeRoomSettings = (room, settings) => {
  const gameroom = findRoom(room)[0];

  if (typeof gameroom === 'undefined') { return null; }

  const validateResults = validateRoomSetting(settings);
  if (validateResults && validateResults.length > 0) {
    return { success: false, message: 'room setting is invalid' }
  }
  //Update settings
  gameroom.settings = settings;

  return { success: false, message: 'updated', data: settings };
};

const findRoom = (room) => rooms.filter((r) => r.roomId === room);

// Module Exports
module.exports = {
  createRoom,
  joinRoom,
  checkRoom,
  changeRoomSettings,
  findRoom
};
