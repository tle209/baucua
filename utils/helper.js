// Helper functions
// Sort and return rankings based off the total scores
const setRankingsByTotal = (gameroom) => {
    const players = gameroom.players;
    const sorted_players = [...players].sort((a, b) => {
        return b.total - a.total;
    });

    // Set rankings
    sorted_players[0].rank = 1;
    for (let i = 1; i < sorted_players.length; i++) {
        if (sorted_players[i].total === sorted_players[i - 1].total) {
            sorted_players[i].rank = sorted_players[i - 1].rank;
        } else {
            sorted_players[i].rank = sorted_players[i - 1].rank + 1;
        }
    }

    return sorted_players;
};

// Sort and return rankings based on net scores
const setRankingsByNet = (gameroom) => {
    const players = gameroom.players;
    const sorted_players = [...players].sort((a, b) => {
        return b.net - a.net;
    });

    return sorted_players;
};

// Check if all players are ready
const allReady = (gameroom) => {
    const players = gameroom.players;

    for (let i = 0; i < players.length; i++) {
        if (players[i].ready === false) {
            return false;
        }
    }

    return true;
};

module.exports = {
    setRankingsByTotal,
    setRankingsByNet,
    allReady
}