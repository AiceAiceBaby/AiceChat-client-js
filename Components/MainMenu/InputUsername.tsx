import React, {
    FormEventHandler,
    useContext,
} from "react";
import {isTextIsEmpty} from "../../Utils";
import {StoreContext} from "../../pages/_app";

interface IInputUsernameProps {
    isHosting: boolean,
    isJoining: boolean,
    setShowWaiting: Function
    setShowRoomIdInput: Function
    setShowUsernameInput: Function
}

export default function InputUsername<NextPage>({isHosting, isJoining, setShowWaiting, setShowRoomIdInput, setShowUsernameInput}: IInputUsernameProps) {
    const { username: [username, setUsername] } = useContext(StoreContext);

    const handleFormSubmission: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setShowUsernameInput(false);
        if (isHosting) setShowWaiting(true);
        else if (isJoining) setShowRoomIdInput(true);
    }

    return (
        <div>
            <form onSubmit={handleFormSubmission}
                  className="msger-input-vertical">
                <h1>Username</h1>
                <input type="text"
                       className="msger-input"
                       value={username as string}
                        // @ts-ignore
                       onChange={e => setUsername(e.target.value)}
                        required/>
                <button type="submit"
                        className="msger-send-btn">Next
                </button>
            </form>
        </div>
    )
}
