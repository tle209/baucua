/**
 * Add bet function
 * @param {*} room 
 * @param {*} id 
 * @param {*} amount 
 * @param {*} animal 
 */
const addBet = (room, id, amount, animal) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    const player = gameroom.players.find((p) => p.id === id);

    const playerbet = gameroom.bets.find(
        (pb) => pb.id === id && pb.animal === animal
    );

    if (playerbet) {
        playerbet.amount += amount;
    } else {
        const bet = {
            id: player.id,
            animal: animal,
            amount: amount,
            color: player.color,
        };

        gameroom.bets.push(bet);
    }

    player.total -= amount;
    player.net -= amount;

    return gameroom;
};

/**
 * Remove bet function
 * @param {*} room 
 * @param {*} id 
 * @param {*} amount 
 * @param {*} animal 
 */
const removeBet = (room, id, amount, animal) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    const player = gameroom.players.find((p) => p.id === id);

    const playerbet = gameroom.bets.find(
        (pb) => pb.id === id && pb.animal === animal
    );

    if (playerbet) {
        const index = gameroom.bets.findIndex(
            (b) => b.id === id && b.animal === animal
        );
        gameroom.bets.splice(index, 1);
        player.total += amount;
        player.net += amount;
    }

    return gameroom;
};

/**
 * Clear all bets
 * @param {*} room 
 */
const clearBets = (room) => {
    const gameroom = findRoom(room)[0];
    if (gameroom === undefined) return null;

    gameroom.bets = [];

    return gameroom;
};

module.exports = {
    addBet,
    removeBet,
    clearBets
}