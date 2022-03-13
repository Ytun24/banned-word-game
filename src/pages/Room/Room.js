import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Room.css";
import RandomWord from "../../services/RandomWord/RandomWord";
import AddWord from "../../components/AddWord/AddWord";
import db from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
} from "firebase/firestore";

const Room = () => {
  const roomDemo = "room-demo";
  const bannedWords = "banned-words";
  let [playerList, setPlayerList] = useState([]);
  let [bannedWordList, setBannedWordList] = useState([]);

  useEffect(() => {
    getBannedWordList();
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

  const getBannedWordList = async () => {
    const bannedWordsRef = collection(db, bannedWords);
    const snapshot = await getDocs(bannedWordsRef);
    snapshot.forEach((doc) => {
      if (doc.data()) {
        bannedWordList.push(doc.data().word);
      }
    });
    console.log(bannedWordList);
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
    setPlayerList(playerList);
  };

  const setBannedWord = async (playerName, playerId) => {
    const roomColRef = doc(db, roomDemo, playerId);
    let player = {
      playerName: playerName,
      bannedWord: RandomWord(bannedWordList),
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
          className="py-2 w-full lg:w-4/12 rounded-lg bg-indigo-500 text-white"
        >
          Random Word
        </button>
      );
    else return <div className="hidden"></div>;
  };

  const AddWordSection = () => {
    if (sessionStorage.getItem("playerName") === "host")
      return (
        <div className="AddWord flex flex-col w-10/12 lg:w-3/12 space-y-6 bg-white rounded-lg shadow p-10">
          <AddWord></AddWord>
        </div>
      );
    else return <div className="hidden"></div>;
  };

  return (
    <div className="Room flex lg:flex-row flex-col min-h-screen w-full items-center justify-center gap-4">
      <div className="flex flex-col w-10/12 lg:w-6/12 space-y-6 bg-white rounded-lg shadow p-10">
        <div className="flex justify-center gap-4">
          <RandomButton></RandomButton>
        </div>
        <div className="list">
          <div className="flex row py-2">
            <div className="w-6/12 text-lg font-medium text-gray-900">Name</div>
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
      <AddWordSection></AddWordSection>
    </div>
  );
};

Room.propTypes = {};

Room.defaultProps = {};

export default Room;
