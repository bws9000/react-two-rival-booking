export const walletConnect = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return {
        address: addressArray[0],
      };
    } catch (err) {
      alert(err.message);
    }
  }
};

export const walletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
        };
      } else {
        return {
          address: '',
        };
      }
    } catch (err) {
      alert(err.message);
    }
  }
};
