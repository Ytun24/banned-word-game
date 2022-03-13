import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AddWord.css";
import db from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddWord = () => {
  const bannedWords = "banned-words";
  const [word, setWord] = useState("");

  const addWord = async (e) => {
    console.log(word);
    if (sessionStorage.getItem("playerName")==="host") {
      e.preventDefault();
      await setBannedWord(word);

      setWord("");
    }
  };

  const setBannedWord = (word) => {
    const bannedWordsRef = collection(db, bannedWords);
    return addDoc(bannedWordsRef, {
      word: word,
    });
  };

  return (
    <div className="AddWord space-y-6">
      <div className="flex flex-col w-full ">
        <div className="w-full input-group">
          <label className="block font-medium text-gray-700">Word:</label>
          <input
            name="word"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="block w-full py-2 px-3 sm:text-sm border border-gray-300 rounded-md text-center"
          ></input>
        </div>
      </div>
      <button
        onClick={addWord}
        className="py-2 w-full rounded-lg bg-indigo-500 text-white"
      >
        Add
      </button>
    </div>
  );
};

AddWord.propTypes = {};

AddWord.defaultProps = {};

export default AddWord;
