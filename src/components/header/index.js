import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { walletConnected, walletConnect } from '../wallet/Wallet';

const Header = () => {
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        async function getWallet() {
            const { address } = await walletConnected();
            setWalletAddress(address);
        }
        getWallet();

    }, [])

    const clickConnectWallet = async () => {
        const walletResponse = await walletConnect();
        if (walletResponse !== undefined) setWalletAddress(walletResponse.address);
    };

    return (
        <div>
            <div className="twoRivalBooking"><h3>Two Rival Booking</h3></div>
            <header>
                <Link to='/'>Home</Link>&nbsp;|&nbsp;
                <span onClick={clickConnectWallet}>{walletAddress.length > 0 ? (
                    'connected ...' + String(walletAddress).substring(36)
                ) : (
                    <span className="clickable"> * Connect *</span>
                )}</span>

            </header>
        </div>
    )
}
export default Header;