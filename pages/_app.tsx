import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import {
  createContext, Dispatch, SetStateAction,
  useState
} from "react";

interface IStoreContext {
  username: [string, Dispatch<SetStateAction<string>>],
  roomId: [string, Dispatch<SetStateAction<string>>]
  selfPrivateKey: [string, Dispatch<SetStateAction<string>>]
  otherPublicKey: [string, Dispatch<SetStateAction<string>>]
}

export const StoreContext = createContext<IStoreContext>({
  // @ts-ignore
  username: [],
  // @ts-ignore
  roomId: [],
  // @ts-ignore
  selfPrivateKey: [],
  // @ts-ignore
  otherPublicKey: [],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  let privateKey = '';
  let publicKey = '';

  try {
    privateKey = JSON.parse(process.env?.NEXT_PUBLIC_RSA_PRIVATE_KEY as string)?.privateKey || '';
    publicKey = JSON.parse(process.env?.NEXT_PUBLIC_RSA_PUBLIC_KEY as string)?.publicKey || '';
  } catch (e) {

  }

  const [selfPrivateKey, setSelfPrivateKey] = useState(privateKey);
  const [otherPublicKey, setOtherPublicKey] = useState(publicKey);

  const store = {
    username: [username, setUsername],
    roomId: [roomId, setRoomId],
    selfPrivateKey: [selfPrivateKey, setSelfPrivateKey],
    otherPublicKey: [otherPublicKey, setOtherPublicKey]
  }

  return (
    // @ts-ignore
      <StoreContext.Provider value={store}>
        <Component {...pageProps} />
      </StoreContext.Provider>
  );
}
