import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { StoreContext } from './_app';

export default function Settings<NextPage>() {
  const {
    selfPrivateKey: [selfPrivateKey, setSelfPrivateKey],
    otherPublicKey: [otherPublicKey, setOtherPublicKey]
  } = useContext(StoreContext);

  return (
    <div>
      <Head>
        <title>Aice Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="msger-container">
        <div className="msger">
          <header className="msger-header">
            <div className="msger-header-left title">
              <Link href="/messages">
                <a className="link">⬅</a>
              </Link>
              ️
            </div>
            <div className="msger-header-left title">Settings</div>
            <div/>
          </header>

          <main className="msger-settings">
            <div>
              <p>Your private key:</p>
              <textarea value={selfPrivateKey} onChange={(e) => setSelfPrivateKey(e.target.value)}/>
            </div>
            <div>
              <p>Other user&apos;s public key:</p>
              <textarea value={otherPublicKey} onChange={(e) => setOtherPublicKey(e.target.value)} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
