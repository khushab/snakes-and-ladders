import React, { useContext, useState } from "react";
import { login, register } from "../../api";
import { UserContext } from "../../contexts/userContext";

function AuthForm({ closeModal }) {
  const [isLogin, setIsLogin] = useState(true);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        // Log in
        const userData = await login(username, password);
        setUser(userData);
      } else {
        // Register
        const userData = await register(fullName, username, password);
        setUser(userData);
      }
      closeModal();
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const resetForm = () => {
    setFullName("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container mx-auto min-w-[400px] mt-10">
      <h2 className="text-2xl mb-4 text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <form
        className="bg-white rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {isLogin ? (
          <>
            <div className="mb-4">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                type="username"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className=" text-red-500 mb-6"> {errorMessage}</div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="Full Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                type="username"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Password"
                required
                value={password}
                minLength={7}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className=" text-red-500 mb-6"> {errorMessage}</div>
          </>
        )}
        <div className="flex flex-col items-center justify-between">
          <button
            disabled={isLoading}
            className="btn-primary w-full"
            type="submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <div className="flex items-center">
            <span> or </span>
          </div>
          <button
            disabled={isLoading}
            className="btn w-full"
            type="button"
            onClick={toggleForm}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
