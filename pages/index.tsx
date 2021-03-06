import Head from 'next/head'
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
