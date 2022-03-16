import "./App.css";
import HomePage from "./components/HomePage";
import JoinRoom from "./components/JoinRoom";
import PlayGame from "./components/PlayGame";
import React, { useState, useEffect } from "react";

function App() {
  const [roomID, setRoomID] = useState("");
  const [playName, setPlayName] = useState("");
  const [startGame, setStartGame] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("playerName")) {
      console.log('Playname:', sessionStorage.getItem("playerName"))
      setPlayName(sessionStorage.getItem("playerName"))
    }
    if (sessionStorage.getItem("roomID")) {
      console.log('RoomID:', sessionStorage.getItem("roomID"))
      setRoomID(sessionStorage.getItem("roomID"))
    }
  }, []);
  return (
    <div className="App bg-gray-100">
      <div className="flex justify-center">
        {!roomID && !startGame && <HomePage setRoomID={setRoomID} setStartGame={setStartGame} />}
        {roomID && !startGame && <JoinRoom setStartGame={setStartGame} setRoomID={setRoomID} />}
        {roomID && startGame && <PlayGame />}

        {/* <PlayGame /> */}
        {/* <Routes className="">
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/room" element={<Room />}></Route>
        </Routes> */}
      </div>
    </div>
  );
}

export default App;
