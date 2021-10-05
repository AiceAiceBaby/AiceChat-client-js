import Head from 'next/head'
import Link from 'next/link'
import MainMenuComponent from "../components/MainMenuComponent";

export default function Home<NextPage>() {
    return (
        <div>
            <Head>
                <title>Aice Chat</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <MainMenuComponent/>

        </div>
    )
}
