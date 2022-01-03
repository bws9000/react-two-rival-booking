export const handleFunctionNoParam = async (func) => {

    const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
    });

    if (addressArray.length > 0) {
        const { tx } = await func();
        if (tx !== 'error') {
            console.log('tx: ' + tx);
        } else {
            alert('Transaction Failed.');
        }
    } else {
        alert('connect to wallet.');
    }
}

export const handleFunctionOneParam = async (func, param) => {

    const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
    });

    if (addressArray.length > 0) {
        const { tx } = await func(param);
        if (tx !== 'error') {
            console.log('tx: ' + tx);
        } else {
            alert('Transaction Failed.');
        }
    } else {
        alert('connect to wallet.');
    }
}

export const handleFunctionTwoParam = async (func, param, param2) => {

    const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
    });

    if (addressArray.length > 0) {
        const { tx } = await func(param, param2);
        if (tx !== 'error') {
            console.log('tx: ' + tx);
        } else {
            alert('Transaction Failed.');
        }
    } else {
        alert('connect to wallet.');
    }
}