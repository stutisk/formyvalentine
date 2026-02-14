import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LovePage from "./pages/LovePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/love" element={<LovePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
