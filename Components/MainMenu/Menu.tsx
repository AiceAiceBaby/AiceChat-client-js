import React from "react";

interface IMenuProps {
    setIsHosting: Function,
    setIsJoining: Function,
    setShowUsernameInput: Function
}

export default function Menu<NextPage>({ setIsHosting, setIsJoining, setShowUsernameInput}: IMenuProps) {
    const handleClick = (isHosting: boolean) => {
        setShowUsernameInput(true);
        if (isHosting) setIsHosting(true);
        else setIsJoining(true);
    };

    return (
        <>
            <a type="button" onClick={() => handleClick(true)} className="msger-menu-btn">
                Create Room
            </a>
            <a type="button" onClick={() => handleClick(false)} className="msger-menu-btn">
                Join Room
            </a>
        </>
    )
}
