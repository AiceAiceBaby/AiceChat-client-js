import React, {useContext, useEffect, useState} from "react";
import Router from 'next/router'
import AiceChatServer from "../../API/AiceChatServer";
import {StoreContext} from "../../pages/_app";
import { handleAPIError } from "../../Utils";

export default function Waiting<NextPage>({ setShowWaiting }: {setShowWaiting: Function}) {
    const {
        roomId: [roomId, setRoomId],
        username: [username, setUsername]
    } = useContext(StoreContext);
    const [roomLink, setRoomLink] = useState("");

    useEffect(() => {
        let id: string;
        AiceChatServer.roomCreate()
        .then(({data}) => {
            id = data.room.id as string;
            return AiceChatServer.roomJoin(id, username);
        })
        .then(({data}) => {
            setRoomId(id);
            setRoomLink(`${location.protocol}//${location.host}/room/join/${id}`);
        })
        .catch(handleAPIError);

        const checkIfSomeoneJoined = setInterval(() => {
            if (!id) return;
            AiceChatServer.roomGet(id)
            .then(({data}) => {
                console.log('data.room.users', data.room.users)
                if (data.room.users.length > 1) Router.push('/messages');
            })
            .catch((err) => {
                alert('something went wrong: ' + err.message);
                console.log(err.response.data)
            });
        }, 1000);

        return () => {
            clearInterval(checkIfSomeoneJoined);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h2>Link: <a href={roomLink}>{roomLink}</a></h2>
            <h2>Room ID: {roomId}</h2>
            <h1>Waiting For Someone to Join...</h1>
        </div>
    )
}
