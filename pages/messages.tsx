import Head from 'next/head'
import Chat from "../Components/Chat";

export default function Messages<NextPage>() {
    return (
        <div>
            <Head>
                <title>Aice Chat</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Chat/>
        </div>
    )
}
