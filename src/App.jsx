import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import SignUp from "./pages/SignUp";
import NearbyBrowse from "./pages/NearbyBrowse";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

function App() {
  const { user, token, logout } = useUser();

  const ProtectedRoute = ({ children }) => {
    const { user } = useUser();
    return user ? children : <Navigate to="/login" />;
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/nearbybrowse" element={<NearbyBrowse />} />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
