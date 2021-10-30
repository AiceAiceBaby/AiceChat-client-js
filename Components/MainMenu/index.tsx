import React, {useContext, useEffect, useState} from "react";
import Menu from "./Menu";
import InputUsername from "./InputUsername";
import InputRoomId from "./InputRoomId";
import {StoreContext} from "../../pages/_app";
import Waiting from "./Waiting";
import Link from "next/link";

export default function MainMenu<NextPage>({ directJoin = false}) {
    const [isHosting, setIsHosting] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [showWaiting, setShowWaiting] = useState(false);
    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const [showRoomIdInput, setShowRoomIdInput] = useState(false);
    const {
        roomId: [roomId, _],
    } = useContext(StoreContext);

    const backToMainMenu = () => {
        setIsHosting(false);
        setIsJoining(false);
        setShowWaiting(false);
        setShowUsernameInput(false);
        setShowRoomIdInput(false);
    }

    const BackButton = (
        <div className="msger-header-left title">
            <a href="#" className="link" onClick={backToMainMenu}>⬅</a>
        ️</div>
    );

    useEffect(() => {
        if (directJoin) {
            setIsJoining(true);
            setShowUsernameInput(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="msger-container">
            <div className="msger">
                <header className="msger-header">
                    { (showUsernameInput || showRoomIdInput || showWaiting) ? BackButton : <div/>}
                    <div className="msger-header-left title">Main Menu</div>
                    <div/>
                </header>

                <main className="msger-menu">
                    {
                        (!isHosting && !isJoining) &&
                        <Menu setIsHosting={setIsHosting}
                              setIsJoining={setIsJoining}
                              setShowUsernameInput={setShowUsernameInput}/>
                    }
                    {
                        showUsernameInput &&
                        <InputUsername isHosting={isHosting}
                                       isJoining={isJoining}
                                       setShowWaiting={setShowWaiting}
                                       setShowUsernameInput={setShowUsernameInput}
                                       setShowRoomIdInput={setShowRoomIdInput}/>
                    }
                    { showRoomIdInput && <InputRoomId/> }
                    { showWaiting && <Waiting setShowWaiting={setShowWaiting}/> }
                </main>
            </div>
        </div>
    );
}
