import axios from 'axios';
import { getACSApiUrl } from '../../Utils';

const roomGet = (roomId: string) => {
    const url = getACSApiUrl(`/room/get/${roomId}`);
    return axios.get(url);
};

export default roomGet;