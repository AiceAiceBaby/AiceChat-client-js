import Head from 'next/head'
import Router from 'next/router';
import React, { useContext, useEffect } from 'react'
import roomGet from '../../../API/AiceChatServer/roomGet'
import MainMenu from '../../../Components/MainMenu'
import { StoreContext } from '../../_app';

export default function RoomJoin<NextPage>({ data }: { data: any }) {
    const {
        roomId: [_, setRoomId],
    } = useContext(StoreContext);

    useEffect(() => {
        const {
            room,
            success,
            msg
        } = data;

        if (!success) { // this needs to be changed in api
            alert(msg);
            // Router.push('/');
        } else {
            setRoomId(room.id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Head>
                <title>Aice Chat</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <MainMenu directJoin/>
        </div>
    )
}

export async function getServerSideProps({ params } : { params: any }) {
    let result: any;
    try {
        const { data } = await roomGet(params.id);
        result = data;
    } catch(e: any) {
        result = e.response.data;
    }

    return { props: { data: result } }
  }