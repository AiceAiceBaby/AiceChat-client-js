import axios from 'axios';
import { getACSApiUrl } from '../../Utils';

const roomJoin = (roomId: string, username: string) => {
    const url = getACSApiUrl(`/room/join/${roomId}`);
    return axios.post(url, { username });
};

export default roomJoin;