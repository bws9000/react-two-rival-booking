import React, { useEffect, useState } from 'react';
import { TRBContract, registerUser, clearRegistration } from '../contract/TwoRivalBooking';
import { handleFunctionOneParam } from '../components/common/web3/transactions';
import { callGetRegistrationStatus } from '../contract/TwoRivalBooking';
import BookRoom from '../route/BookRoom';
// import { useHistory } from "react-router-dom";
import { handleFunctionNoParam } from '../components/common/web3/transactions';

const Register = () => {

    localStorage.clear();
    // const history = useHistory();
    var registerEvent = null;
    const [regStatus, setRegStatus] = useState(false);

    useEffect(() => {
        registerListener();
        async function getStatus() {
            setRegStatus(await callGetRegistrationStatus());
        }
        getStatus();
        return () => {
            registerEvent.unsubscribe(function (err, success) {
                if (success) {
                    //
                }
            });
        };
    }, [])

    function registerListener() {
        registerEvent = TRBContract.events.UserRegistered(
            {},
            (error, data) => {
                if (error) {
                    console.log('error: ' + error);
                } else {
                    var status = callGetRegistrationStatus();
                    setRegStatus(status);
                    console.log('returnValues: ' + JSON.stringify(data.returnValues));
                }
            }
        );
    }

    const clickRegister = (groupName) => {
        localStorage.setItem('group', groupName); //tmp
        handleFunctionOneParam(registerUser, groupName);
    };

    const unRegister = async () => {
        handleFunctionNoParam(clearRegistration);
    }

    return (
        <div>

            <div className="registration">

                {regStatus ? (
                    <BookRoom />
                ) : (

                    <ul>
                        <li>
                            <h3>Registration</h3>
                        </li>
                        <li>
                            <button onClick={() => clickRegister("P")}>Register for Group P</button>
                        </li>
                        <li>
                            <button onClick={() => clickRegister("C")}>Register for Group C</button>
                        </li>
                    </ul>
                )}


                {callGetRegistrationStatus() ? (
                    <div>
                        <div className="clearRegistration">
                            <button onClick={() => unRegister()}>Clear Registration</button>
                        </div>
                    </div>
                ) : ""}

            </div>
        </div>
    )
}

export default Register;