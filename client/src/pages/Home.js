import React, { useContext, useEffect, useState } from "react";
import Modal from "../components/reusable/Modal";
import AuthForm from "../components/containers/AuthForm";
import { AppContext } from "../contexts/appContext";
import {
  deleteSavedMatch,
  getLeaderboard,
  getSavedMatches,
  logout,
} from "../api";
import { useNavigate } from "react-router-dom";
import { SavedMatches } from "../components/containers/SavedMatches";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  const [isAuthFormModalOpen, setIsAuthFormModalOpen] = useState(false);
  const [isSavedGamesModalOpen, setIsSavedGamesModalOpen] = useState(false);

  const [Leaderboard, setLeaderboard] = useState([]);
  const [savedMatches, setSavedMatches] = useState([]);
  const handleLoginLogout = async () => {
    if (user) {
      // Logout
      await logout();
      setUser(null);
    } else {
      // Open Login Modal
      setIsAuthFormModalOpen(true);
    }
  };

  const handlePlayOnline = () => {
    if (!user) setIsAuthFormModalOpen(true);
    else navigate("/multiplayerMatch");
  };
  const getUsersSavedMatches = async () => {
    const savedMatches = await getSavedMatches();
    setSavedMatches(savedMatches);
  };

  const deleteUsersSavedMatch = async (id) => {
    await deleteSavedMatch(id);
    getUsersSavedMatches();
  };

  const getAndSetLeaderboard = async () => {
    const result = await getLeaderboard();
    setLeaderboard(result);
    setIsLoading(false);
  };

  const handlePlayVsBot = () => {
    if (!user) setIsAuthFormModalOpen(true);
    else navigate("/match");
  };

  useEffect(() => {
    if (user) getUsersSavedMatches();
    getAndSetLeaderboard();
  }, []);

  if (isLoading) return null;

  return (
    <>
      <div className="border-b-2">
        <div className="max-w-5xl m-auto py-5 flex items-center justify-between">
          <h1 className="font-semibold text-2xl">
            Welcome, {user ? user.name : "Guest"}
          </h1>
          <button onClick={handleLoginLogout} className="btn-primary">
            {user ? "Logout" : "Login or Signup"}
          </button>
        </div>
      </div>
      <div className="max-w-2xl m-auto flex flex-col justify-center py-10 mt-6 px-5 shadow-md gap-5">
        <h2 className="text-2xl font-semibold text-center">
          Play Snakes & Ladders
        </h2>
        <button onClick={handlePlayVsBot} className="btn-primary text-center">
          Play vs Bot
        </button>
        <button className="btn-primary" onClick={handlePlayOnline}>
          Play Online
        </button>
        {user && (
          <button
            className="btn-primary"
            onClick={() => setIsSavedGamesModalOpen(true)}
          >
            Load Saved Game
          </button>
        )}

        <hr />

        <h2 className="text-xl font-semibold">Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {Leaderboard.map((player, index) => (
              <tr key={index + 1} className=" font-semibold">
                <td>{index + 1}</td>
                <td>{player.playerId?.name}</td>
                <td>{player.wins}</td>
                <td>{player.losses}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isAuthFormModalOpen}
        closeModal={() => setIsAuthFormModalOpen(false)}
        closeOnOverlayClick={true}
      >
        <AuthForm closeModal={() => setIsAuthFormModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isSavedGamesModalOpen}
        closeModal={() => setIsSavedGamesModalOpen(false)}
        closeOnOverlayClick={true}
      >
        <SavedMatches
          savedMatches={savedMatches}
          deleteUsersSavedMatch={deleteUsersSavedMatch}
        />
      </Modal>
    </>
  );
};

export default Home;
