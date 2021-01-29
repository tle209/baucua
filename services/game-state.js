// Functions that handle gamestate
// Set all player balances and gameroom to active
const setInitialGamestate = (room, balance) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    gameroom.active = true;

    for (let i = 0; i < gameroom.players.length; i++) {
        gameroom.players[i].total = balance;
    }

    return gameroom;
};

// Clear the gamestate and deactivate gameroom
const resetGamestate = (room) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    gameroom.active = false;
    gameroom.bets = [];
    gameroom.dice = [];
    gameroom.round = 1;

    for (let i = 0; i < gameroom.players.length; i++) {
        gameroom.players[i].total = 0;
        gameroom.players[i].net = 0;
        gameroom.players[i].rank = 1;
        gameroom.players[i].bankrupt = false;
        gameroom.players[i].ready = false;
    }

    return gameroom;
};

// Go to next round
const nextRound = (room) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    gameroom.round += 1;
    if (gameroom.round > gameroom.settings.rounds) {
        return -1;
    }
    return gameroom.round;
};

// Clear all nets
const clearNets = (room) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    for (let i = 0; i < gameroom.players.length; i++) {
        gameroom.players[i].net = 0;
    }

    return gameroom;
};

// Functions that handle score calculation
// Calculate total scores
const calculateBets = (room) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    let prev_rolls = [];
    for (let die = 0; die < gameroom.dice.length; ++die) {
        const bets = gameroom.bets.filter((b) => b.animal === gameroom.dice[die]);

        if (bets.length > 0) {
            for (let win = 0; win < bets.length; ++win) {
                const player = gameroom.players.find((p) => p.id === bets[win].id);

                if (prev_rolls.find((d) => d === gameroom.dice[die])) {
                    player.total += bets[win].amount;
                } else {
                    player.total += bets[win].amount * 2;
                }
            }

            prev_rolls.push(gameroom.dice[die]);
        }
    }

    // Unready players after calculation
    for (let p = 0; p < gameroom.players.length; ++p) {
        gameroom.players[p].ready = false;

        // Check for bankruptcy
        if (gameroom.players[p].total === 0) {
            gameroom.players[p].bankrupt = true;
            gameroom.players[p].ready = true;
        }
    }

    return setRankingsByTotal(gameroom);
};

// Calculate net scores
const calculateNets = (room) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    let prev_rolls = [];
    for (let die = 0; die < gameroom.dice.length; ++die) {
        const bets = gameroom.bets.filter((b) => b.animal === gameroom.dice[die]);

        if (bets.length > 0) {
            for (let win = 0; win < bets.length; ++win) {
                const player = gameroom.players.find((p) => p.id === bets[win].id);

                if (prev_rolls.find((d) => d === gameroom.dice[die])) {
                    player.net += bets[win].amount;
                } else {
                    player.net += bets[win].amount * 2;
                }
            }

            prev_rolls.push(gameroom.dice[die]);
        }
    }

    return setRankingsByNet(gameroom);
};

/**
 * Check for bankruptcy
 * @param {*} room 
 */
const checkBankrupt = (room) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    const players = gameroom.players;
    for (let p = 0; p < players.length; p++) {
        if (!players[p].bankrupt) {
            return false;
        }
    }

    return true;
};

// Functions that handle the dice roll
// Roll the dice
const rollDice = (room) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    const animals = ["deer", "gourd", "rooster", "fish", "crab", "shrimp"];

    // Resort array for extra randomness
    let a = animals.length,
        k,
        temp;
    while (--a > 0) {
        k = Math.floor(Math.random() * (a + 1));
        temp = animals[k];
        animals[k] = animals[a];
        animals[a] = temp;
    }

    const dice = [];
    let die;
    for (die = 0; die < 3; die++) {
        const index = Math.floor(Math.random() * 6);
        const d = animals[index];
        dice.push(d);
    }

    gameroom.dice = dice;

    return gameroom;
};

module.exports = {
    setInitialGamestate,
    resetGamestate,
    nextRound,
    clearNets,
    calculateBets,
    calculateNets,
    checkBankrupt,
    rollDice,
}