import { useState } from "react";
import { loginUser } from "../api/api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ForgotPassword from "../components/ForgotPassword";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotPasswordPopup, setForgotPasswordPopup] = useState(false);
  const { login } = useUser();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    loginUser(username, password)
      .then((data) => {
        login(data.user, data.token);
        navigate("/schedule");
      })
      .catch((err) => {
        if (err.response?.data?.msg === "User not found") {
          setError("No account found with that username.");
          setIsLoading(false);
        } else if (err.response?.data?.msg === "Invalid password") {
          setError("Incorrect password.");
          setIsLoading(false);
        } else {
          setError("Something went wrong. Please try again.");
          setIsLoading(false);
        }
      });
  }

  function handleForgotPassword(e) {
    e.preventDefault();
    setForgotPasswordPopup(true);
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold tracking-tight">Login</h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-lg border border-gray-500 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-500 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div className="text-end mt-2 text-xs">
              <button
                className="hover:underline text-gray-500"
                type="button"
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-lg bg-yellow-300 hover:bg-yellow-400 px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-50 disabled:hover:bg-yellow-300"
          >
            Sign in
          </button>
        </form>
        {error ? (
          <p className="text-red-500 text-sm text-center mt-1">{error}</p>
        ) : (
          <p className="h-3"></p>
        )}
      </div>

      <button
        className="text-sm text-gray-500 text-center mt-4 hover:underline"
        onClick={(e) => navigate("/signup")}
      >
        Don't have an account? Click here to sign up!
      </button>
      {forgotPasswordPopup && (
        <ForgotPassword setForgotPasswordPopup={setForgotPasswordPopup} />
      )}
    </div>
  );
}

export default Login;
