import "./App.css";
import Home from "./pages/Home/Home";
import Room from "./pages/Room/Room";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App bg-gray-100">
      <div className="flex justify-center">
        <Routes className="">
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/room" element={<Room />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
