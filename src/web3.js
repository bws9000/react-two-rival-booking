import Web3 from 'web3';
import env from './env';
const web3 = new Web3(window.ethereum);
web3.setProvider(
    // new Web3.providers.HttpProvider(env.TEST_HTTP_PROVIDER)
    new Web3.providers.WebsocketProvider(env.TEST_WEBSOCKET_PROVIDER)
);
web3.eth.net
    .isListening()
    .then(() => console.log('* ' + env.TEST_HTTP_PROVIDER + ' CONNECTED'))
    .catch((e) =>
        console.log('* ' + env.TEST_HTTP_PROVIDER + ' ERROR: ' + e)
    );
export default web3;