import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Join.css";
import db from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
const Join = () => {
    const [roomID, setRoomID] = useState("");
    const [helpText, setHelpText] = useState("");
    const joinRoom = (roomID) => {
        console.log(roomID)
        sessionStorage.setItem("roomID", roomID);
        if (roomID) {
            checkRoomID()
        }
        else
            setHelpText("ID ห้องด้วยครับ<<")
    }
    const checkRoomID = async () => {
        const docRef = doc(db, "room", roomID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setHelpText('')
            addPlayer();
        } else {
            setHelpText("ตรวจสอบอีกครั้ง")
        }
    }
    const addPlayer = () => {
        let obj = {}
        obj[sessionStorage.getItem("playerName")] = "wait host random"
        const cityRef = doc(db, 'room', roomID);
        setDoc(cityRef, obj, { merge: true });
        window.location.pathname = "/room";
    }
    useEffect(() => {
        setRoomID(sessionStorage.getItem("roomID"))
    }, []);
    return (
        <div className="Join flex h-screen w-full items-center justify-center">
            <div className="flex flex-col space-y-6 w-10/12 lg:w-6/12 h-fit items-center justify-center bg-white shadow px-10 py-20 rounded-lg">
                <h1 className="text-3xl font-bold underline text-indigo-500">Don't say that word!</h1>
                <div className="flex flex-col w-full gap-6">
                    {/* move input Room */}
                    <div className="w-full input-group pt-5">
                        <label className="block font-medium text-gray-700">
                            Room ID:
                        </label>
                        <input
                            name="roomID"
                            value={roomID}
                            onChange={(e) => setRoomID(e.target.value)}
                            className="block w-full py-2 px-3 sm:text-sm border border-gray-300 rounded-md text-center"
                        ></input>
                        <label>{helpText} </label>
                    </div>
                </div>
                <div className="w-full">
                    <button
                        onClick={joinRoom(roomID)}
                        className="py-2 mx-10 w-1/3 rounded-lg text-white bg-indigo-500 border border-indigo-500"
                    >
                        Go !
                    </button>

                </div>
                <div className="w-full">
                    <button
                        onClick={() => { window.location.pathname = "/" }}
                        className="py-2 mx-10 w-1/3 rounded-lg text-white bg-indigo-500 border border-indigo-500"
                    >
                        Back !
                    </button>

                </div>
            </div>
        </div>
    );
};

Join.propTypes = {};

Join.defaultProps = {};

export default Join;
