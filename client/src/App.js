import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Match from "./pages/Match";
import ErrorPage from "./pages/ErrorPage";
import { useContext, useEffect, useState } from "react";
import { getLoggedInUser } from "./api";
import { AppContext } from "./contexts/appContext";
import MultiplayerMatch from "./pages/MultiplayerMatch";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useContext(AppContext);

  const getUserDetails = async () => {
    try {
      const user = await getLoggedInUser();
      setUser(user);
    } catch (error) {}
    setIsLoading(false);
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  if (isLoading) {
    return <h2 className="p-40 text-center text-2xl">Loading...</h2>;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match" element={<Match />} />
        <Route path="/multiplayerMatch" element={<MultiplayerMatch />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
