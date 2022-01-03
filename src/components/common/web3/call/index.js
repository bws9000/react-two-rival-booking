export async function call(abi, contractAddress, method, w3) {
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
    try {
        const contract = await new w3.eth.Contract(abi, contractAddress);
        return await contract.methods[method](param).call((err, result) => {
            if (err) return err;
            return result;
        });
    } catch (error) {
        return error;
    }
}