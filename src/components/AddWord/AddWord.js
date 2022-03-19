import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AddWord.css";
import db from "../../firebase";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";

const AddWord = () => {
  const bannedWords = "banned-words";
  const [word, setWord] = useState("");
  const [emptyWordSnapshot, setEmptyWordSnapshot] = useState(true);

  const checkEmptyWordSnapshot = async () => {
    const queryRef = query(
      collection(db, bannedWords),
      where("word", "==", word)
    );
    const querySnapshot = await getDocs(queryRef);
    setEmptyWordSnapshot(querySnapshot.empty);
    console.log(word, querySnapshot.empty);
    return querySnapshot.empty;
  };

  const addWord = async (e) => {
    if (word && await checkEmptyWordSnapshot()) {
      e.preventDefault();
      await setBannedWord(word);
      setWord("");
    }
  };

  const setBannedWord = async (word) => {
    const bannedWordsRef = collection(db, bannedWords);
    await addDoc(bannedWordsRef, {
      word: word,
    });
  };

  const ErrorMessage = () => {
    if (!emptyWordSnapshot && word)
      return (
        <div className="pt-1 text-sm text-rose-800">
          Duplicate word!
        </div>
      );
    else return <div className="hidden"></div>;
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
        <ErrorMessage></ErrorMessage>
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
