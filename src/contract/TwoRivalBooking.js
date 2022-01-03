import web3 from '../web3';
import env from '../env';
import { call, callWithOneParam } from '../components/common/web3/call';
import { walletConnected } from '../components/wallet/Wallet';

const TRB = require('./TwoRivalBooking.json');

export const TRBContract = new web3.eth.Contract(
    TRB.abi,
    env.CONTRACT_ADDRESS
);

//read
export const callGetRegistrationStatus = async () => {
    return await call(TRB.abi, env.CONTRACT_ADDRESS, 'registrationStatus', web3);
}
export const callGetRoom = async (param) => {
    return await callWithOneParam(TRB.abi, env.CONTRACT_ADDRESS, 'getRoom', param, web3);
}

//write
export const bookMeetingRoom = async (hour, roomNum) => {

    const wallet = await walletConnected();
    const params = {
        to: env.CONTRACT_ADDRESS,
        from: wallet.address,
        data: TRBContract.methods.bookRoom(hour, roomNum).encodeABI(),
    };

    try {
        const hash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [params],
        });
        return {
            tx: hash,
        };
    } catch (error) {
        console.log(error);
        return {
            tx: 'error',
        };
    }
};

export const registerUser = async (groupName) => {

    const wallet = await walletConnected();
    console.log('wallet address: ' + wallet.address);
    const params = {
        to: env.CONTRACT_ADDRESS,
        from: wallet.address,
        data: TRBContract.methods.registerUser(groupName).encodeABI(),
    };

    try {
        const hash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [params],
        });
        return {
            tx: hash,
        };
    } catch (error) {
        console.log(error);
        return {
            tx: 'error',
        };
    }
};

export const clearRegistration = async () => {

    var wallet = await walletConnected();
    const params = {
        to: env.CONTRACT_ADDRESS,
        from: wallet.address,
        data: TRBContract.methods.clearRegistration().encodeABI(),
    };

    try {
        const hash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [params],
        });
        return {
            tx: hash,
        };
    } catch (error) {
        console.log(error);
        return {
            tx: 'error',
        };
    }
};