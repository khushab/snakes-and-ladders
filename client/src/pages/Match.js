import React, { useEffect, useState } from "react";
import ActionButtons from "../components/match/ActionButtons";
import Board from "../components/match/Board";
import DiceRoll from "../components/match/DiceRoll";
import Modal from "../components/reusable/Modal";
import SelectPlayers from "../components/containers/SelectPlayers";
import Confirmation from "../components/containers/Confirmation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteSavedMatch, getSavedMatch, saveMatch } from "../api";

const Match = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);

  const [isSelectPlayersModalOpen, setIsSelectPlayersModalOpen] =
    useState(true);
  const [isResetGameModalOpen, setIsResetGameModalOpen] = useState(false);
  const [isPauseGameModalOpen, setIsPauseGameModalOpen] = useState(false);
  const [isExitGameModalOpen, setIsExitGameModalOpen] = useState(false);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);

  const [showDiceRoll, setShowDiceRoll] = useState(false);
  const [diceNumSrc, setDiceNumSrc] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [currPlayer, setcurrPlayer] = useState(1);
  const [disableRoll, setDisableRoll] = useState(false);

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

  const selectPlayer = (numOfPlayers) => {
    setNumberOfPlayers(numOfPlayers);
    setIsSelectPlayersModalOpen(false);
  };

  const getDiceNumberImageSrc = (num) =>
    require(`../images/diceImages/${num}.png`);

  const diceRollHandler = () => {
    setDisableRoll(true);
    setShowDiceRoll(true);
    setTimeout(() => {
      setShowDiceRoll(false);

      //generate a random number between 1 and 6
      const diceNum = Math.ceil(Math.random() * 6);

      const player = `p${currPlayer}`;

      // If score goes above 100 then dont move the player
      if (diceNum + playersPos[player] > 100) {
        setDisableRoll(false);
        moveToNextPlayer();
        return;
      }

      setDiceNumSrc(getDiceNumberImageSrc(diceNum));

      // Move the player one step at a time
      for (let i = 1; i <= diceNum + 2; i++) {
        setTimeout(() => {
          if (i <= diceNum) {
            movePlayer(player, 1);
          }
          if (i === diceNum + 1) {
            const isWinner = checkForSnakesLaddersAndWinner(diceNum);
            if (!isWinner) {
              setDisableRoll(false);
              moveToNextPlayer();
            }
          }
        }, 200 * i);
      }
    }, 1000);
  };

  // move to next player after the current player's chance is done
  const moveToNextPlayer = () => {
    if (currPlayer === numberOfPlayers) {
      setcurrPlayer(1);
    } else {
      setcurrPlayer(currPlayer + 1);
    }
  };

  const checkForSnakesLaddersAndWinner = (diceNum) => {
    const currPos = playersPos[`p${currPlayer}`];
    const nextPos = currPos + diceNum;

    // Checking if the player has landed on a snake or ladder
    if (ladders[nextPos]) {
      movePlayer(`p${currPlayer}`, null, ladders[nextPos]);
    } else if (snakes[nextPos]) {
      movePlayer(`p${currPlayer}`, null, snakes[nextPos]);
    }

    // Checking if the player has won the game
    if (nextPos === 100 || ladders[nextPos] === 100) {
      setIsWinnerModalOpen(true);
      const savedGameId = searchParams.get("id");
      if (savedGameId) deleteSavedMatch(savedGameId);
      return true;
    }
  };

  // Check if the current game is a saved game and load it
  const checkAndGetSavedGame = async () => {
    try {
      const savedGameId = searchParams.get("id");
      if (savedGameId) {
        const result = await getSavedMatch(savedGameId);
        if (!result) navigate("/");
        setPlayersPos(result.playersPos);
        let numbOfPlayers = 0;
        for (const player in playersPos) {
          if (result.playersPos[player] !== 0) numbOfPlayers++;
        }
        selectPlayer(numbOfPlayers);
      }

      setIsLoading(false);
    } catch (error) {
      navigate("/");
    }
  };

  // Move the player to the given position
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

  // Save the current game
  const saveUserMatch = async () => {
    const savedGameId = searchParams.get("id");
    await saveMatch(playersPos, savedGameId);
    navigate("/");
  };

  // Reset the game
  const resetGame = () => {
    setPlayersPos({
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
    });
    setcurrPlayer(1);
    setIsResetGameModalOpen(false);
  };

  useEffect(() => {
    checkAndGetSavedGame();
    setDiceNumSrc(getDiceNumberImageSrc(1));
  }, []);

  useEffect(() => {
    if (currPlayer !== 1 && playersPos[`p${currPlayer}`] !== 100) {
      setDisableRoll(true);
      setTimeout(() => {
        diceRollHandler();
      }, 1000);
    } else {
      setDisableRoll(false);
    }
  }, [currPlayer]);

  if (isLoading) {
    return <h2 className="p-40 text-center text-2xl">Loading...</h2>;
  }
  if (numberOfPlayers === 0) {
    return (
      <Modal
        isOpen={isSelectPlayersModalOpen}
        closeModal={() => setIsSelectPlayersModalOpen(false)}
      >
        <SelectPlayers onSelectPlayer={selectPlayer} />
      </Modal>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-4xl font-semibold text-center my-10">{`P${currPlayer} is playing`}</h1>
      <div className="flex gap-10 ">
        <div className="flex-1 flex flex-col items-end gap-6 px-6">
          <ActionButtons
            onReset={() => setIsResetGameModalOpen(true)}
            onPause={() => setIsPauseGameModalOpen(true)}
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

      {/* Modals start */}
      <Modal
        isOpen={isPauseGameModalOpen}
        closeModal={() => setIsPauseGameModalOpen(false)}
        closeOnOverlayClick={true}
      >
        <Confirmation
          title={"Are you sure you want to pause & save the game?"}
          onYesClick={saveUserMatch}
          onNoclick={() => setIsPauseGameModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isResetGameModalOpen}
        closeModal={() => setIsResetGameModalOpen(false)}
        closeOnOverlayClick={true}
      >
        <Confirmation
          title={"Are you sure you want to reset the game?"}
          onYesClick={resetGame}
          onNoclick={() => setIsResetGameModalOpen(false)}
        />
      </Modal>

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
            {`Player ${currPlayer} won the game`}
          </h2>
          <button className="btn-primary m-auto" onClick={() => navigate("/")}>
            Go to home
          </button>
        </div>
      </Modal>
      {/* Modals end */}
    </div>
  );
};

export default Match;
