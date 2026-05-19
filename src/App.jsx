import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4"></main>

      <Footer />
    </div>
  );
}

export default App;
