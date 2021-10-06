import React, {useContext, useState} from "react";
import Menu from "./Menu";
import InputUsername from "./InputUsername";
import InputRoomId from "./InputRoomId";
import {StoreContext} from "../../pages/_app";
import Waiting from "./Waiting";

export default function MainMenu<NextPage>() {
    const [isHosting, setIsHosting] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [showWaiting, setShowWaiting] = useState(false);
    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const [showRoomIdInput, setShowRoomIdInput] = useState(false);
    // const { username: [username, setUsername] } = useContext(StoreContext);

    return (
        <div className="msger-container">
            <div className="msger">
                <header className="msger-header">
                    <div/>
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
