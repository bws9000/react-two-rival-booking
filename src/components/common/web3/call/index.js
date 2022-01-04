import { walletConnected } from '../../../wallet/Wallet';

export async function call(abi, contractAddress, method, w3) {

    const wallet = await walletConnected();
    w3.eth.defaultAccount = wallet.address;

    try {
        const contract = await new w3.eth.Contract(abi, contractAddress);
        return await contract.methods[method]().call((err, result) => {
            if (err) return err;
            return result;
        });
    } catch (error) {
        return error;
    }
}
export async function callWithOneParam(abi, contractAddress, method, param, w3) {

    const wallet = await walletConnected();
    w3.eth.defaultAccount = wallet.address;

    try {
        const contract = await new w3.eth.Contract(abi, contractAddress);
        return await contract.methods[method](param).call((err, result) => {
            if (err) return err;
            console.log('RESULT: ' + result);
            return result;
        });
    } catch (error) {
        return error;
    }
}
export async function callWithTwoParam(abi, contractAddress, method, param, param2, w3) {

    const wallet = await walletConnected();
    w3.eth.defaultAccount = wallet.address;

    try {
        const contract = await new w3.eth.Contract(abi, contractAddress);
        return await contract.methods[method](param, param2).call((err, result) => {
            if (err) return err;
            console.log('RESULT: ' + result);
            return result;
        });
    } catch (error) {
        return error;
    }
}