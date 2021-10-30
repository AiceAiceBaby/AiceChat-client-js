import React, {FormEventHandler, useContext} from "react";
import Router from 'next/router'
import {handleAPIError, isTextIsEmpty} from "../../Utils";
import {StoreContext} from "../../pages/_app";
import AiceChatServer from "../../API/AiceChatServer";

export default function InputRoomId<NextPage>() {
    const {
        roomId: [roomId, setRoomId],
        username: [username, _]
    } = useContext(StoreContext);

    const handleFormSubmission: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        AiceChatServer.roomJoin(roomId, username)
        .then(({data}) => {
            Router.push('/messages');
        })
        .catch(handleAPIError);
    }

    return (
        <div>
            <form onSubmit={handleFormSubmission} className="msger-input-vertical">
                <h1>Room ID</h1>
                <input type="text"
                       className="msger-input"
                       value={roomId as string}
                       // @ts-ignore
                       onChange={e => setRoomId(e.target.value)}
                       required/>
                <button type="submit"
                        className="msger-send-btn">Join
                </button>
            </form>
        </div>
    )
}
