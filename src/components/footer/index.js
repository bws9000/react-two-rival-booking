import React, { useEffect } from 'react';
import { TRBContract } from '../../contract/TwoRivalBooking';
import { useHistory } from "react-router-dom";

const Footer = () => {

    var unRegisterEvent = null;
    const history = useHistory();

    useEffect(() => {
        unRegisterListener();
        return () => {
            unRegisterEvent.unsubscribe(function (err, success) {
                if (success) { //
                }
            });
        };
    }, [])

    async function unRegisterListener() {
        unRegisterEvent = TRBContract.events.RegistrationCleared(
            {},
            async (error, data) => {
                if (error) {
                    console.log('error: ' + error);
                } else {
                    history.push("/");
                    console.log('returnValues: ' + JSON.stringify(data.returnValues));
                }
            }
        );
    }

    return (
        <footer></footer>
    )
}
export default Footer;