import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Homepage />
      </main>

      <Footer />
    </div>
  );
}

export default App;
