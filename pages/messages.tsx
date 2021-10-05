import Head from 'next/head'
import Link from 'next/link'
import ChatComponent from "../components/ChatComponent";

export default function Messages<NextPage>() {
    return (
        <div>
            <Head>
                <title>Aice Chat</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <ChatComponent/>
        </div>
    )
}
