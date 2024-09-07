import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Fbar from "./components/FeatureBar";
import Home from "./pages/Home";
import MyNotes from "./pages/MyNotes";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-custom-gradient bg-[#8EC5FC]">
      <Router>
        <Navbar />
        <Fbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<MyNotes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
