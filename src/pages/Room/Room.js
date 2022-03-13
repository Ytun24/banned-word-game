import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Room.css";
import RandomWord from "../../services/RandomWord/RandomWord";
import db from "../../firebase";
import { collection, doc, getDocs, setDoc ,onSnapshot,query} from "firebase/firestore";

const Room = () => {
  const roomDemo = "room-demo";
  let [playerList, setplayerList] = useState([]);

  useEffect(() => {
    getPlayerList();
    realtime();
  }, []);

  const randomWord = () => {
    playerList.forEach((doc) => {
      setBannedWord(doc.playerName, doc.docId);
    });
  };

  const getPlayerList = async () => {
    const roomColRef = collection(db, roomDemo);
    const snapshot = await getDocs(roomColRef);
    updatePlayerList(snapshot);

  };
  const realtime = async () => {
    const q = query(collection(db, roomDemo));
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      getPlayerList();
    });
  };
  const updatePlayerList = (snapshot) => {
    playerList = [];
    snapshot.forEach((doc) => {
      if (doc.data()) {
        playerList.push({ ...doc.data(), docId: doc.id });
      }
    });
    console.log(playerList);
    setplayerList(playerList);
  };

  const setBannedWord = async (playerName, playerId) => {
    const roomColRef = doc(db, roomDemo, playerId);
    let player = {
      playerName: playerName,
      bannedWord: RandomWord(),
    };
    await setDoc(roomColRef, player);
    console.log(player);
  };

  const RandomButton = () => {
    /* start random word to every player */
    if (sessionStorage.getItem("playerName") === "host")
      return (
        <button
          onClick={randomWord}
          className="py-2 w-40 rounded-lg bg-indigo-500 text-white"
        >
          Random Word
        </button>
      );
    else return <div></div>;
  };

  return (

    <div className="Room flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col w-10/12 lg:w-6/12 space-y-6 bg-white rounded-lg shadow p-10">
        <div className="flex justify-center gap-4">
          {/* get user list */}

          <button
            onClick={getPlayerList}
            className="py-2 w-40 rounded-lg bg-indigo-500 text-white"
          >
            Get Player List
          </button>

          <RandomButton></RandomButton>
        </div>
        <div className="list">
          <div className="flex row py-2">
            <div className="w-6/12 text-lg font-medium text-gray-900">
              Name
            </div>
            <div className="w-6/12 text-lg font-medium text-gray-900">
              Banned Word
            </div>
          </div>
          {playerList.map((player, index) => {
            const bannedWord =
              player.playerName === sessionStorage.getItem("playerName")
                ? "???"
                : player.bannedWord;
            return (
              <div className="flex border-t border-gray-200 py-2" key={index}>
                <div className="w-6/12">{player.playerName}</div>
                <div className="w-6/12">{bannedWord}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Room.propTypes = {};

Room.defaultProps = {};

export default Room;
