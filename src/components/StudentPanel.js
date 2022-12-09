import React from 'react'
import axios from 'axios';
import swal from "sweetalert";
import AdminNav from './Admin/AdminNav';
import { useState, useEffect } from 'react';
export default function StudentPanel() {
    var url = "http://localhost:1000/";
    const [dues, setdues] = useState([])

    const [logInfo, setLogInfo] = useState([]);

    const sendrequest = () => {
        // console.log(localStorage.getItem('UserId'))
        let obj = { user: localStorage.getItem('UserId') }
        axios.post(url + "sendrequest", obj).then((succ) => {
            // console.log(succ);
            if (succ.data.acknowledged === true) {
                swal("Request sent successfully", "", "success")
            } else if (succ.data === "Already exists") {
                swal("Request already sent", "", "info")
                // setreqstat(1)

            }
        });

    }

    const obj = { idd: localStorage.getItem('UserId') }
    function getdata() {
        axios.get(url + "getdues").then((succ) => {
            setdues(succ.data)
        })
        axios.post(url + "loginfo", obj).then((succ) => {

            setLogInfo(succ.data);
        })
    }
    useEffect(() => {
        getdata();

    }, []);
    return (
        <div>
            <div className="py-5">
                <AdminNav />

            </div>
            <div className="container d-flex justify-content-center">
                <h2> Welcome, {logInfo.FirstName + " " + logInfo.LastName}!</h2>
                {dues.reduce(function (accumulator, curValue) {

                    return accumulator + Number(curValue.Dues)

                },0)}
            </div>
            <div className="row p-0 m-0 row-cols-1 row-cols-md-3 g-4  d-flex justify-content-center">
                {dues.filter(row => row.StudentId === logInfo._id).map((row) => (

                    <div className="col" key={row._id}>
                        <div className="card m-2">

                            <div className="card-body">
                                <h5 className="card-title">{row.Facility}</h5>

                                <p className="card-text">
                                    <b>Amount: Rs {row.Dues}</b><br />
                                    Penalty Registered By: {row.penalizeByName}
                                    <br />Reason: {row.Reason}</p>
                                <button className='btn  btn-success'>Pay now</button>
                            </div>
                        </div>
                    </div>
                ))}



            </div>

            <div className="container d-flex justify-content-center">
                <button className="btn  my-5 btn-primary" onClick={sendrequest}>Request No due Certificate</button>
            </div>
        </div>
    )
}
