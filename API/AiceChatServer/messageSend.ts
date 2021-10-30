import axios from 'axios';
import { getACSApiUrl } from '../../Utils';

const messageSend = (roomId: string, username: string, message: string) => {
    const url = getACSApiUrl(`/message/send/${roomId}`);
    return axios.post(url, { username, message });
};

export default messageSend;