const findingPlayersFor2 = [];
const findingPlayersFor3 = [];
const findingPlayersFor4 = [];
let playingArr = [];

const onConnection = (io, socket) => {
  socket.on("find_match", (userData) => {
    if (userData.numOfPlayers === 2) {
      findingPlayersFor2.push(userData);
    } else if (userData.numOfPlayers === 3) {
      findingPlayersFor3.push(userData);
    } else if (userData.numOfPlayers === 4) {
      findingPlayersFor4.push(userData);
    }
    if (findingPlayersFor2.length >= 2) {
      fillArrayBasedOnNumOfPlayers(2, findingPlayersFor2);
      io.emit("start_match", playingArr);
    } else if (findingPlayersFor3.length >= 3) {
      fillArrayBasedOnNumOfPlayers(3, findingPlayersFor3);
      io.emit("start_match", playingArr);
    } else if (findingPlayersFor4.length >= 4) {
      fillArrayBasedOnNumOfPlayers(4, findingPlayersFor4);
      io.emit("start_match", playingArr);
    }
  });

  io.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("send_chance", (data) => {
    io.emit("receive_chance", {
      diceNum: data.diceNum,
      lastPlayer: data.currPlayer,
    });
  });

  socket.on("send_winner", (winner) => {
    io.emit("receive_winner", winner);
    removeFinishedMatchObjectFromPlayingArr(winner);
  });
};

const fillArrayBasedOnNumOfPlayers = (numOfPlayers, arr) => {
  const matchObj = {};
  for (let i = 0; i < numOfPlayers; i++) {
    matchObj[`p${i + 1}`] = {
      ...arr[i],
      playerPosVal: `p${i + 1}`,
    };
  }

  playingArr.push(matchObj);
  arr.splice(0, numOfPlayers);
  return matchObj;
};

const removeFinishedMatchObjectFromPlayingArr = (winner) => {
  if (winner.numOfPlayers === 2) {
    playingArr = playingArr.filter(
      (player) => player.p1._id !== winner._id && player.p2._id !== winner._id
    );
  } else if (winner.numOfPlayers === 3) {
    playingArr = playingArr.filter(
      (player) =>
        player.p1._id !== winner._id &&
        player.p2._id !== winner._id &&
        player.p3._id !== winner._id
    );
  } else if (winner.numOfPlayers === 4) {
    playingArr = playingArr.filter(
      (player) =>
        player.p1._id !== winner._id &&
        player.p2._id !== winner._id &&
        player.p3._id !== winner._id &&
        player.p4._id !== winner._id
    );
  }
};

module.exports = onConnection;
