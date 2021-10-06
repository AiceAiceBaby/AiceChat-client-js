import React, {FormEventHandler, useContext} from "react";
import Router from 'next/router'
import {isTextIsEmpty} from "../../Utils";
import {StoreContext} from "../../pages/_app";

export default function InputRoomId<NextPage>() {
    const { roomId: [roomId, setRoomId] } = useContext(StoreContext);

    const handleFormSubmission: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        Router.push('/messages');
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
