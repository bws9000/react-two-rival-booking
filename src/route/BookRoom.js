import React, { useEffect, useState } from 'react';
import { TRBContract, callGetRoom, bookMeetingRoom } from '../contract/TwoRivalBooking';
import { handleFunctionTwoParam } from '../components/common/web3/transactions';

const BookRoom = () => {

    var bookEvent = null;
    const [roomArray, setRoomArray] = useState([]);
    const [roomNum, setRoomNum] = useState(0);

    useEffect(() => {
        bookListener();
        getRoom();
        return () => {
            bookEvent.unsubscribe(function (err, success) {
                if (success) {
                    console.log('registerListener: unsubscribed');
                }
            });
        };
    }, []);

    async function bookListener() {
        bookEvent = TRBContract.events.RoomBooked(
            {},
            async (error, data) => {
                if (error) {
                    console.log('error: ' + error);
                } else {
                    let num = parseInt(localStorage.getItem('room'));
                    localStorage.setItem('room', num - 1);
                    getRoom();
                    console.log('returnValues: ' + JSON.stringify(data.returnValues));
                }
            }
        );
    }

    const getRoom = async () => {
        if (!localStorage.getItem('room')) { localStorage.setItem('room', 0); }
        let num = parseInt(localStorage.getItem('room'));
        setRoomNum(num + 1);
        localStorage.setItem('room', num + 1);
        const ra = await callGetRoom(localStorage.getItem('room'));
        console.log('ra: ' + ra);
        setRoomArray(ra);
    }

    const bookRoom = (num) => {
        handleFunctionTwoParam(bookMeetingRoom, num, localStorage.getItem('room'));
    }

    const dirtyPaginate = async () => {
        if (localStorage.getItem('room') < 10) {
            getRoom(localStorage.getItem('room'));
        } else {
            localStorage.setItem('room', 0);
            getRoom(localStorage.getItem('room'));
        }
    }

    return (
        <div>
            <div className="page">
                <h5>Meeting Room: {roomNum}</h5>
                <span>Book your hour for the meetings today. - # users (hour)</span>
                <div className="grid-container">
                    {
                        roomArray.map((item, index) => <div onClick={() => bookRoom(index)} key={index} className="grid-item">{item}&nbsp;<strong>({index + 1})</strong></div>)
                    }
                </div>

                <div className="roomSelection">
                    <span onClick={() => dirtyPaginate()}> &#x2192; </span>
                </div>
            </div>
        </div>


    )
}
export default BookRoom;