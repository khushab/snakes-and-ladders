import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import Modal from "../components/reusable/Modal";
import SelectPlayers from "../components/containers/SelectPlayers";
import { AppContext } from "../contexts/appContext";
import ActionButtons from "../components/match/ActionButtons";
import Board from "../components/match/Board";
import DiceRoll from "../components/match/DiceRoll";
import { useNavigate } from "react-router-dom";
import Confirmation from "../components/containers/Confirmation";
import { saveScore } from "../api";

const API_URL = process.env.REACT_APP_API_URL;
const socket = io(API_URL);

const MultiplayerMatch = () => {
  const navigate = useNavigate();

  const { user } = useContext(AppContext);

  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [isSelectPlayersModalOpen, setIsSelectPlayersModalOpen] =
    useState(true);

  const [isExitGameModalOpen, setIsExitGameModalOpen] = useState(false);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);

  const [isFindingMatch, setIsFindingMatch] = useState(false);
  const [opponents, setOpponents] = useState([]);

  const [currPlayer, setCurrPlayer] = useState({});

  const [disableRoll, setDisableRoll] = useState(false);
  const [showDiceRoll, setShowDiceRoll] = useState(false);
  const [diceNumSrc, setDiceNumSrc] = useState("");
  const [isCurrPlayerChance, setIsCurrPlayerChance] = useState(false);

  const [winner, setWinner] = useState(null);

  const [playersPos, setPlayersPos] = useState({
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
  });

  const ladders = {
    3: 76,
    54: 95,
  };

  const snakes = {
    21: 2,
    46: 10,
    87: 70,
    96: 41,
  };

  const getNextPlayer = (currPlayerPos) => {
    if (numberOfPlayers === 2) {
      if (currPlayerPos === "p1") {
        return "p2";
      } else {
        return "p1";
      }
    } else if (numberOfPlayers === 3) {
      if (currPlayerPos === "p1") {
        return "p2";
      } else if (currPlayerPos === "p2") {
        return "p3";
      } else {
        return "p1";
      }
    } else {
      if (currPlayerPos === "p1") {
        return "p2";
      } else if (currPlayerPos === "p2") {
        return "p3";
      } else if (currPlayerPos === "p3") {
        return "p4";
      } else {
        return "p1";
      }
    }
  };

  const findMatch = (numOfPlayers) => {
    socket.emit("find_match", {
      ...user,
      numOfPlayers,
    });
    setIsSelectPlayersModalOpen(false);
    setIsFindingMatch(true);
  };

  const selectPlayer = (numOfPlayers) => {
    setNumberOfPlayers(numOfPlayers);
    findMatch(numOfPlayers);
  };
  const getDiceNumberImageSrc = (num) =>
    require(`../images/diceImages/${num}.png`);

  useEffect(() => {
    socket.open();
    socket.on("start_match", (playingArr) => {
      const userId = user._id;
      const foundPlayers = playingArr.find(
        (it) =>
          it.p1._id === userId ||
          it.p2._id === userId ||
          it.p3._id === userId ||
          it.p4._id === userId
      );

      if (foundPlayers) {
        for (const [_, value] of Object.entries(foundPlayers)) {
          if (value._id === userId) {
            setCurrPlayer(value);
          } else {
            setOpponents([...opponents, value]);
          }
        }
      }
      setDiceNumSrc(getDiceNumberImageSrc(1));
      setIsFindingMatch(false);
      if (foundPlayers.p1._id === userId) {
        setIsCurrPlayerChance(true);
      }
    });

    socket.on("receive_chance", (data) => {
      animateMovePlayer(
        data.diceNum,
        data.lastPlayer.playerPosVal,
        data.lastPlayer
      );
    });

    socket.on("receive_winner", (winner) => {
      setWinner(winner.playerPosVal);
      setIsWinnerModalOpen(true);
      if (winner._id !== currPlayer._id) {
        saveScore({
          losses: 1,
        });
      }
    });

    return () => {
      socket.off("start_match");
      socket.off("receive_chance");
      socket.off("receive_winner");
      socket.close();
    };
  }, [socket, currPlayer, winner]);

  const movePlayer = (player, moves, position) => {
    switch (player) {
      case "p1":
        setPlayersPos((prevPos) => ({
          ...prevPos,
          p1: position ? position : prevPos.p1 + moves,
        }));
        break;
      case "p2":
        setPlayersPos((prevPos) => ({
          ...prevPos,
          p2: position ? position : prevPos.p2 + moves,
        }));
        break;
      case "p3":
        setPlayersPos((prevPos) => ({
          ...prevPos,
          p3: position ? position : prevPos.p3 + moves,
        }));
        break;
      case "p4":
        setPlayersPos((prevPos) => ({
          ...prevPos,
          p4: position ? position : prevPos.p4 + moves,
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isCurrPlayerChance) {
      setDisableRoll(false);
    } else {
      setDisableRoll(true);
    }
  }, [isCurrPlayerChance]);

  const diceRollHandler = () => {
    setDisableRoll(true);
    setShowDiceRoll(true);
    setTimeout(() => {
      setShowDiceRoll(false);

      //generate a random number between 1 and 6
      const diceNum = Math.ceil(Math.random() * 6);

      const player = currPlayer.playerPosVal;

      // If score goes above 100 then dont move the curr player
      if (diceNum + playersPos[player] > 100) {
        setDisableRoll(false);
        socket.emit("send_chance", { currPlayer, diceNum });
        return;
      }
      animateMovePlayer(diceNum, player);
    }, 1000);
  };

  const animateMovePlayer = (diceNum, player, lastPlayer) => {
    setDiceNumSrc(getDiceNumberImageSrc(diceNum));
    for (let i = 1; i <= diceNum + 2; i++) {
      setTimeout(() => {
        if (
          i <= diceNum &&
          !(lastPlayer?.playerPosVal === currPlayer.playerPosVal)
        ) {
          movePlayer(player, 1);
        }
        if (i === diceNum + 1) {
          if (!lastPlayer) {
            const isWinner = checkForSnakesLaddersAndWinner(diceNum);
            if (!isWinner) {
              setDisableRoll(false);
              socket.emit("send_chance", { currPlayer, diceNum });
              setIsCurrPlayerChance(false);
            }
          }
          if (lastPlayer) {
            const nextPlayer = getNextPlayer(lastPlayer.playerPosVal);
            checkForSnakesLaddersAndWinner(diceNum, lastPlayer);
            if (nextPlayer === currPlayer.playerPosVal) {
              setIsCurrPlayerChance(true);
            }
          }
        }
      }, 200 * i);
    }
  };

  const checkForSnakesLaddersAndWinner = (diceNum, player) => {
    const currPlayerPos = player
      ? player.playerPosVal
      : currPlayer.playerPosVal;
    const currPos = playersPos[currPlayerPos];
    const nextPos = currPos + diceNum;

    if (ladders[nextPos]) {
      movePlayer(currPlayerPos, null, ladders[nextPos]);
    } else if (snakes[nextPos]) {
      movePlayer(currPlayerPos, null, snakes[nextPos]);
    }
    if (nextPos === 100 || ladders[nextPos] === 100) {
      setIsWinnerModalOpen(true);
      socket.emit("send_winner", currPlayer);
      saveScore({
        wins: 1,
      });
      return true;
    }
  };

  if (numberOfPlayers === 0) {
    return (
      <Modal
        isOpen={isSelectPlayersModalOpen}
        closeModal={() => setIsSelectPlayersModalOpen(false)}
      >
        <SelectPlayers maxNoOfPlayers={2} onSelectPlayer={selectPlayer} />
      </Modal>
    );
  }

  if (isFindingMatch) {
    return (
      <div className="p-40 text-center">
        Searching for {numberOfPlayers > 2 ? "players" : "player"}....
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-4xl font-semibold text-center my-10">
        {`${
          isCurrPlayerChance
            ? "You are"
            : getNextPlayer(currPlayer.playerPosVal) + " is"
        } playing`}
      </h1>
      <div className="flex gap-10 ">
        <div className="flex-1 flex flex-col items-end gap-6 px-6">
          <ActionButtons
            onExit={() => setIsExitGameModalOpen(true)}
            disableButtons={disableRoll}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <Board playersPos={playersPos} numberOfPlayers={numberOfPlayers} />
        </div>
        <div className="flex-1 px-6">
          <DiceRoll
            showDiceRoll={showDiceRoll}
            diceNumSrc={diceNumSrc}
            diceRollHandler={diceRollHandler}
            disableRoll={disableRoll}
          />
        </div>
      </div>

      <Modal
        isOpen={isExitGameModalOpen}
        closeModal={() => setIsExitGameModalOpen(false)}
        closeOnOverlayClick={true}
      >
        <Confirmation
          title={"Are you sure you want to exit the game?"}
          onYesClick={() => navigate("/")}
          onNoclick={() => setIsExitGameModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isWinnerModalOpen}
        closeModal={() => setIsWinnerModalOpen(false)}
        closeOnOverlayClick={false}
      >
        <div className="p-5 flex flex-col items-center justify-center gap-5">
          <h2 className=" text-2xl text-center font-semibold">
            {`${isCurrPlayerChance ? "You" : winner} won the game!!`}
          </h2>
          <button className="btn-primary m-auto" onClick={() => navigate("/")}>
            Go to home
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MultiplayerMatch;
