import axios from 'axios';
import { getACSApiUrl } from '../../Utils';

const messageGet = (roomId: string) => {
    const url = getACSApiUrl(`/message/get/${roomId}`);
    return axios.get(url);
};

export default messageGet;