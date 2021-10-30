import messageGet from "./messageGet";
import messageSend from "./messageSend";
import roomCreate from "./roomCreate";
import roomGet from "./roomGet";
import roomJoin from "./roomJoin";

const AiceChatServer = {
    roomGet,
    roomCreate,
    roomJoin,
    messageSend,
    messageGet
};

export default AiceChatServer