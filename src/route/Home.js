import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
// import { callGetRegistrationStatus } from '../contract/TwoRivalBooking';

const Home = () => {

    const history = useHistory();

    useEffect(() => {

        async function getStatus() {
            // const status = await callGetRegistrationStatus();
        }
        getStatus();
    })


    return (

        <div className="page">
            Click <Link to='/register'>here</Link> to Register / Book Meeting Room
        </div>

    )
}
export default Home;