import React, { useState, useEffect } from "react";
import RandomWord from "../services/RandomWord/RandomWord";
import AddWord from "./AddWord/AddWord";
import db from "../firebase";
import { collection, doc, getDocs, setDoc, onSnapshot, deleteDoc, deleteField, updateDoc } from "firebase/firestore";
const PlayGame = () => {
    const roomDemo = "room-demo";
    const bannedWords = "banned-words";
    let [admin, setAdmin] = useState('');
    let [playerList, setPlayerList] = useState([]);
    let [bannedWordList, setBannedWordList] = useState([]);
    let roomid = sessionStorage.getItem("roomID")
    let myName = sessionStorage.getItem("playerName")
    const getPlayerList = async () => {
        const docRef = doc(db, "room", roomid);
        onSnapshot(docRef, (querySnapshot) => {
            if (querySnapshot.exists()) {
                console.log(Object.entries(querySnapshot.data()));
                getPlayer(querySnapshot.data())
            }
            else {
                // window.location.pathname = "/";
                console.log("No such document!");
            }
        });
    };
    const getPlayer = (obj) => {
        let playerLists = [];
        Object.entries(obj).forEach(([key, value]) => {
            if (key == "admin" && value == myName) {
                setAdmin(value)
                admin = value;
                getBannedWordList();
            }
            else if (key != "admin")
                playerLists.push({ playerName: key, bannedWord: value })
        });
        setPlayerList(playerLists)
    }
    const getBannedWordList = async () => {
        bannedWordList.entries()
        const bannedWordsRef = collection(db, bannedWords);
        const snapshot = await getDocs(bannedWordsRef);
        snapshot.forEach((doc) => {
            if (doc.data()) {
                bannedWordList.push(doc.data().word);
            }
        });
        // console.log(bannedWordList);
    };
    const randomWordBanned = () => {
        var obj = {};
        playerList.map((data) => {
            const index = Math.floor(Math.random() * bannedWordList.length);
            obj[data.playerName] = bannedWordList[index];
            bannedWordList.splice(index, 1);
        })
        const cityRef = doc(db, 'room', roomid);
        setDoc(cityRef, obj, { merge: true });
    }
    // Component
    const RandomButton = () => {
        /* start random word to every player */
        if (sessionStorage.getItem("playerName") === admin)
            return (
                <button
                    onClick={randomWordBanned}
                    className="py-2 w-full lg:w-4/12 rounded-lg bg-indigo-500 text-white"
                >
                    Random Word
                </button>
            );
        else return <div className="hidden"></div>;
    };
    const AddWordSection = () => {
        if (sessionStorage.getItem("playerName") === admin)
            return (
                <div className="AddWord flex flex-col w-10/12 lg:w-3/12 space-y-6 bg-white rounded-lg shadow p-10">
                    <AddWord></AddWord>
                </div>
            );
        else return <div className="hidden"></div>;
    };
    const logOut = async () => {
        console.log("logout")
        console.log('RoomId:', roomid)
        console.log('myName:', myName)
        if (sessionStorage.getItem("playerName") === admin) {
            console.log("Host")
            await deleteDoc(doc(db, "room", roomid));
        } else {
            console.log("Player")
            const cityRef = doc(db, 'room', roomid);
            var obj = {};
            obj[myName] = deleteField();
            await updateDoc(cityRef, obj);
        }
    }
    useEffect(() => {
        roomid = sessionStorage.getItem("roomID")
        myName = sessionStorage.getItem("playerName")
        getPlayerList();
        window.addEventListener("beforeunload", (ev) => {
            logOut();
            ev.preventDefault();
            return ev.returnValue = 'Are you sure you want to close?';
        });
    }, []);
    // Component
    return (
        <div id="click" className="Room flex lg:flex-row flex-col min-h-screen w-full items-center justify-center gap-4">
            <div className="flex flex-col w-10/12 lg:w-6/12 space-y-6 bg-white rounded-lg shadow p-10">
                <span>Room ID: {roomid}</span>
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
export default PlayGame;
