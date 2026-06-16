import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  function handleNav(path) {
    navigate(path);
    setIsOpen(false);
  }

  function handleLogout() {
    logout();
    navigate("/login");
    setIsOpen(false);
  }

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Browse", path: "/browse" },
    { label: "Schedule", path: "/schedule" },
    { label: "Nearby Events", path: "/nearbybrowse" },
    ...(user
      ? [{ label: "Logout", action: handleLogout }]
      : [{ label: "Login", path: "/login" }]),
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex flex-col justify-center items-center gap-1.5 p-2 rounded-lg hover:bg-gray-100"
      >
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          {menuItems.map(({ label, path, action }) => (
            <button
              key={label}
              onClick={() => (action ? action() : handleNav(path))}
              className="block w-full text-left px-4 py-2.5 text-sm hover:bg-yellow-300 first:rounded-t-xl last:rounded-b-xl transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
