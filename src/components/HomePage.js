import React, { useState, useEffect } from "react";
import db from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const HomePage = ({ setRoomID, setStartGame }) => {
    const [playerName, setPlayerName] = useState("");
    const [helpText, setHelpText] = useState("");
    const roomDemo = "room-demo";
    const setPlayNameFun = async (e) => {
        if (playerName) {
            setHelpText('')
            e.preventDefault();
            sessionStorage.setItem("playerName", playerName);
            //   sessionStorage.setItem("RoomID", 'xxxxx');
            setRoomID('xxxxx')
        }
        else
            setHelpText("ใส่ชื่อด้วยครับ<<")
    };
    const createRoom = async () => {
        if (playerName) {
            sessionStorage.setItem("playerName", playerName);
            setHelpText('')
            var obj = { admin: playerName };
            obj[playerName] = "wait host random";
            let roomID = "room-" + randomRoomID(5);
            sessionStorage.setItem("roomID", roomID);
            await setDoc(doc(db, "room", roomID), obj);
            setRoomID(roomID)
            setStartGame(true)
        }
        else
            setHelpText("ใส่ชื่อด้วยครับ<<")
    }
    const randomRoomID = (size) => {
        const text = 'qwertyuiopasdfghjklzxcvbnm';
        let key = ''
        for (let index = 0; index < size; index++) {
            key += text[Math.floor(Math.random() * 26)]
        }
        return key;
    }
    useEffect(() => {
        if (sessionStorage.getItem("playerName")) {
            console.log('Playname:', sessionStorage.getItem("playerName"))
            setPlayerName(sessionStorage.getItem("playerName"))
        }
        if (sessionStorage.getItem("RoomID")) {
            console.log('RoomID:', sessionStorage.getItem("RoomID"))
        }
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
                        <label>{helpText} </label>
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
export default HomePage;
