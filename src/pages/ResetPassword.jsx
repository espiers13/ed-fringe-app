import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/api";
import Button from "../components/Button";
import Heading from "../components/Heading";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    resetPassword(token, newPassword)
      .then(() => {
        setSuccess(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(
          err.response?.data?.msg || "Something went wrong. Please try again.",
        );
        setIsLoading(false);
      });
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <Heading text="Password reset!" />
        <p className="text-gray-600 text-sm">Your password has been updated.</p>
        <Button
          text="Back to Login"
          className="bg-yellow-300 hover:bg-yellow-400"
          onClick={() => navigate("/login")}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Heading text="Reset your password" />
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New password
            </label>
            <div className="mt-2">
              <input
                id="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-500 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm new password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-500 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>
          <Button
            text={isLoading ? "Resetting..." : "Reset password"}
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-300 hover:bg-yellow-400 disabled:opacity-50 disabled:hover:bg-yellow-300"
          />
        </form>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
