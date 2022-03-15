import React, { useState, useEffect } from "react";
import db from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
const JoinRoom = ({ setRoomID, setStartGame }) => {
    const [helpText, setHelpText] = useState("");
    const [key, setKey] = useState("");
    const joinGame = async () => {
        sessionStorage.setItem("roomID", key);
        const docRef = doc(db, "room", key);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setHelpText('')
            let obj = {}
            obj[sessionStorage.getItem("playerName")] = "wait host random"
            const roomRef = doc(db, 'room', key);
            setDoc(roomRef, obj, { merge: true });
            setRoomID(key)
            setStartGame(true)
        } else {
            setHelpText("ตรวจสอบอีกครั้ง")
        }

    }
    useEffect(() => {
        setKey(sessionStorage.getItem("roomID"))
        if (sessionStorage.getItem("playerName")) {
            console.log('Playname:', sessionStorage.getItem("playerName"))
        }
        if (sessionStorage.getItem("roomID")) {
            console.log('RoomID:', sessionStorage.getItem("roomID"))
        }
    }, []);
    return (
        <div className="Join flex h-screen w-full items-center justify-center">
            <div className="flex flex-col space-y-6 w-10/12 lg:w-6/12 h-fit items-center justify-center bg-white shadow px-10 py-20 rounded-lg">
                <h1 className="text-3xl font-bold underline text-indigo-500">Don't say that word! JoinRom</h1>
                <div className="flex flex-col w-full gap-6">
                    <div className="w-full input-group pt-5">
                        <label className="block font-medium text-gray-700">
                            Room ID:
                        </label>
                        <input
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="block w-full py-2 px-3 sm:text-sm border border-gray-300 rounded-md text-center"
                        ></input>
                        <label>{helpText} </label>
                    </div>
                </div>
                <div className="w-full">
                    <button
                        onClick={joinGame}
                        className="py-2 mx-10 w-1/3 rounded-lg text-white bg-indigo-500 border border-indigo-500"
                    >
                        Go !
                    </button>

                </div>
                <div className="w-full">
                    <button
                        onClick={() => { setRoomID(''); sessionStorage.setItem("roomID", ''); }}
                        className="py-2 mx-10 w-1/3 rounded-lg text-white bg-indigo-500 border border-indigo-500"
                    >
                        Back !
                    </button>

                </div>
            </div>
        </div>
    );
};
export default JoinRoom;
