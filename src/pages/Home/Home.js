import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Home.css";
import db from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Home = () => {
  const [playerName, setPlayerName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const roomDemo = "room-demo";

  const joinRoom = async (e) => {
    console.log(playerName, roomNumber);
    if (roomNumber === roomDemo && playerName) {
      e.preventDefault();
      // await createRoom(playerName);
      await setPlayer(playerName);

      sessionStorage.setItem("playerName", playerName);
      window.location.pathname = "/room";

      setPlayerName("");
      setRoomNumber("");
    }
  };

  const setPlayer = (playerName) => {
    const roomColRef = doc(db, roomDemo, `p-${playerName.toLowerCase()}`);
    return setDoc(roomColRef, {
      playerName: playerName,
      bannedWord: "",
    });
  };

  return (
    <div className="Home flex h-screen w-full items-center justify-center">
      <div className="flex flex-col space-y-6 w-10/12 lg:w-6/12 h-fit items-center justify-center bg-white shadow p-10 rounded-lg">
        <h1 className="text-3xl font-bold underline text-indigo-500">Don't say that word!</h1>
        <div className="flex flex-col w-full gap-6">
          <div className="w-full input-group">
            <label className="block font-medium text-gray-700">
              Room ID:
            </label>
            <input
              name="roomNumber"
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="block w-full py-2 px-3 sm:text-sm border border-gray-300 rounded-md text-center"
            ></input>
          </div>
          <div className="w-full input-group">
            <label className="block font-medium text-gray-700">
              Player name:
            </label>
            <input
              name="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="block w-full py-2 px-3 sm:text-sm border border-gray-300 rounded-md text-center"
            ></input>
          </div>
        </div>
        <button
          onClick={joinRoom}
          className="py-2 w-full rounded-lg bg-indigo-500 text-white"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
