import { useState } from "react";
import { forgotPassword } from "../api/api";

function ForgotPassword({ setForgotPasswordPopup }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    forgotPassword(email)
      .then((data) => {
        setMsg(data.msg);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg p-6 w-1/3 min-w-64 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg leading-none"
          onClick={(e) => {
            setForgotPasswordPopup(false);
          }}
        >
          ✕
        </button>
        {msg ? (
          <div>
            <p className="text-center text-gray-700 text-sm mt-3">{msg}</p>
            <button
              className="flex w-full justify-center rounded-lg bg-yellow-300 hover:bg-yellow-400 px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-50 disabled:hover:bg-yellow-300 mt-3"
              onClick={(e) => {
                setForgotPasswordPopup(false);
              }}
            >
              Return to login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="block w-full rounded-lg border border-gray-500 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-yellow-300 hover:bg-yellow-400 px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-50 disabled:hover:bg-yellow-300 mt-3"
              disabled={loading}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
