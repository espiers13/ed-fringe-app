import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Browse from "./pages/Browse";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
