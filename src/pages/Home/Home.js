import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Home.css";
import db from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Home = () => {
  const [playerName, setPlayerName] = useState("");
  const [helpText, setHelpText] = useState("");
  const roomDemo = "room-demo";
  const setPlayNameFun = async (e) => {
    if (playerName) {
      setHelpText('')
      e.preventDefault();
      await setPlayer(playerName);
      sessionStorage.setItem("playerName", playerName);
      console.log(":", sessionStorage.getItem('playerName'))
      // window.location.pathname = "/join";
    }
    else
      setHelpText("Please input player name.")
  };
  const createRoom = async () => {
    if (playerName) {
      setHelpText('')
      var obj = { admin: playerName };
      obj[playerName] = "wait host random";
      let roomID = "room-" + randomRoomID(5);
      sessionStorage.setItem("roomID", roomID);
      await setDoc(doc(db, "room", roomID), obj);
      window.location.pathname = "/room";
    }
    else
      setHelpText("Please input player name.")
  }
  const randomRoomID = (size) => {
    const text = 'qwertyuiopasdfghjklzxcvbnm';
    let key = ''
    for (let index = 0; index < size; index++) {
      key += text[Math.floor(Math.random() * 26)]
    }
    return key;
  }
  const setPlayer = (playerName) => {
    const roomColRef = doc(db, roomDemo, `p-${playerName.toLowerCase()}`);
    return setDoc(roomColRef, {
      playerName: playerName,
      bannedWord: "",
    });
  };
  useEffect(() => {
    if (sessionStorage.getItem("playerName"))
      setPlayerName(sessionStorage.getItem("playerName"))
  }, []);
  return (
    <div className="Home flex h-screen w-full items-center justify-center">
      <div className="flex flex-col space-y-6 w-10/12 lg:w-6/12 h-fit items-center justify-center bg-white shadow px-10 py-20 rounded-lg">
        <h1 className="text-3xl font-bold underline text-indigo-500">Don't say that word!</h1>
        <div className="flex flex-col w-full gap-6">
          <div className="w-full input-group pt-5">
            <label className="block font-medium text-gray-700">
              Player name:
            </label>
            <input
              name="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="block w-full py-2 px-3 sm:text-sm border border-gray-300 rounded-md text-center"
            ></input>
            <label className="pt-1 text-sm text-rose-800">{helpText} </label>
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={setPlayNameFun}
            className="py-2 mx-10 w-1/3 rounded-lg bg-indigo-500 text-white"
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            className="py-2 mx-10 w-1/3 rounded-lg bg-white text-indigo-500 border border-indigo-500"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
