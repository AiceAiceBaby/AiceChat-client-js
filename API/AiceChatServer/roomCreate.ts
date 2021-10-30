import axios from 'axios';
import { getACSApiUrl } from '../../Utils';

const roomCreate = () => {
    const url = getACSApiUrl('/room/create');
    return axios.get(url);
};

export default roomCreate;