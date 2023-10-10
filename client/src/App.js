import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Match from "./pages/Match";
import ErrorPage from "./pages/ErrorPage";
import { useContext, useEffect, useState } from "react";
import { getLoggedInUser } from "./api";
import { UserContext } from "./contexts/userContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useContext(UserContext);

  const getUserDetails = async () => {
    const user = await getLoggedInUser();
    setUser(user);
    setIsLoading(false);
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match" element={<Match />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
