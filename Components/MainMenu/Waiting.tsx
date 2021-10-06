import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../pages/_app";

export default function Waiting<NextPage>({ setShowWaiting }: {setShowWaiting: Function}) {
    const { roomId: [roomId, setRoomId] } = useContext(StoreContext);
    const [roomLink, setRoomLink] = useState("");

    useEffect(() => {
        setTimeout(() => {
            const id = '1234567890';
            // @ts-ignore
            setRoomId(id);
            setRoomLink(`${location.protocol}//${location.host}/room/join/${id}`);
        },1500);
    });

    return (
        <div>
            <h2>Link: <a href={roomLink}>{roomLink}</a></h2>
            <h2>Room ID: {roomId}</h2>
            <h1>Waiting For Someone to Join...</h1>
        </div>
    )
}
