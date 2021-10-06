import Link from "next/link";
import React from "react";

export default function MainMenu<NextPage>() {
    return (<div className="msger-container">
        <div className="msger">
            <header className="msger-header">
                <div/>
                <div className="msger-header-left title">Main Menu</div>
                <div/>
            </header>

            <main className="msger-menu">
                <Link href="/messages">
                    <a type="button" className="msger-menu-btn">Create Room</a>
                </Link>
                <Link href="/messages">
                    <a type="button" className="msger-menu-btn">Join Room</a>
                </Link>
            </main>
        </div>
    </div>);
}
