import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import {
  createContext, Dispatch, SetStateAction,
  useState
} from "react";

interface IStoreContext {
  username: (string | Dispatch<SetStateAction<string>>)[],
  roomId: (string | Dispatch<SetStateAction<string>>)[]
}

export const StoreContext = createContext<IStoreContext>({
  username: [],
  roomId: []
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const store = {
    username: [username, setUsername],
    roomId: [roomId, setRoomId],
  }

  return (
      <StoreContext.Provider value={store}>
        <Component {...pageProps} />
      </StoreContext.Provider>
  );
}
