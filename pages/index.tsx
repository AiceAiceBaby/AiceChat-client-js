import Head from 'next/head'
import { useEffect } from 'react';
import AiceChatServerAPI from '../API/AiceChatServer';
import MainMenu from "../Components/MainMenu";

export default function Home<NextPage>() {
    return (
        <div>
            <Head>
                <title>Aice Chat</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <MainMenu/>
        </div>
    )
}
