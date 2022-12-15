import React from 'react'
import axios from 'axios';
import swal from "sweetalert";
import AdminNav from './Admin/AdminNav';
import { useState, useEffect } from 'react';
import MakePayment from './MakePayment';
import Footer from './Footer';
export default function StudentPanel() {
    var url = "http://localhost:1000/";
    const [dues, setdues] = useState([])

    const [logInfo, setLogInfo] = useState([]);
    const [but, setBut] = useState('new');

    const [facdata, setfacdata] = useState([]);
    const [detaileddata, setdetaileddata] = useState([]);

    const sendrequest = () => {
        // console.log(localStorage.getItem('UserId'))
        let obj = { user: localStorage.getItem('UserId') }

        axios.post(url + "sendrequest", obj).then((succ) => {
            // console.log(succ);
            if (succ.data.acknowledged === true) {
                swal("Request sent successfully", "", "success")
            } else if (succ.data === "Already exists") {
                setBut("view")
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
        axios.get(url + "getfac").then((succ) => {
            setfacdata(succ.data);
        });
        axios.post(url + "getdetailedreqstat", obj).then((succ) => {

            setdetaileddata(succ.data);
        });
    }
    useEffect(() => {
        getdata();

    }, []);
    return (
        <>
            <div>
                <div className="py-5">
                    <AdminNav />

                </div>
                <div className="container d-flex justify-content-center">
                    <h2> Welcome, {logInfo.FirstName + " " + logInfo.LastName}!</h2>


                </div>
                <div className="container d-flex justify-content-center">
                    <h3>
                        <br />Amount Due: Rs {

                            dues.filter(row => row.StudentId === logInfo._id).filter(row => row.Status === "Pending").reduce(function (accumulator, curValue) {

                                return accumulator + Number(curValue.Dues)
                            }, 0)
                        } /-
                    </h3>
                    {/* {detaileddata.map((row)=>Object.values(row))} */}

                    {/* {detaileddata.filter(rw=>"Hardware Lab"===(rw)).map((s)=>Object.values(s))}
                     */}



                </div>
                <div className="row p-0 m-0 row-cols-1 row-cols-md-3 g-4  d-flex justify-content-center">
                    {dues.filter(row => row.StudentId === logInfo._id).map((row) => (

                        <div className="col" key={row._id}>
                            <div className="card m-2">

                                <div className="card-body">
                                    <h5 className="card-title">{row.Facility}</h5>

                                    <p className="card-text">
                                        <b>Amount: Rs {row.Dues}</b><br />
                                        Date & Time: {row.TimeStamp}<br />
                                        Penalty Registered By: {row.penalizeByName}
                                        <br />Reason: {row.Reason}
                                        <br />
                                        <h6 className=''>Status: {row.Status === "Pending" ? (
                                            <>
                                                <span style={{ color: "red" }}>{row.Status}</span>
                                                <MakePayment amount={row.Dues} due={row._id} />

                                            </>

                                        ):(

                                                <>
                                                    <span style={{ color: "green" }}>{row.Status}</span> <br/>
                                                    <button className='btn  btn-success' disabled>Pay now</button>

                                                </>
                                            )
                                        }


                                        </h6>
                                    </p>
                                    {/* <button className='btn  btn-success'>Pay now</button> */}

                                    {/* <MakePayment amount={row.Dues}/> */}


                                </div>
                            </div>
                        </div>
                    ))}



                </div>

                <div className="container d-flex justify-content-center">
                    {but === 'new' ? (
                        <button className="btn  my-5 btn-primary" onClick={sendrequest}>Request no due certificate</button>

                    ) : (
                        <button className="btn  my-5 btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#viewstatus">View Status</button>

                    )}
                </div>

            </div>
            <div className="modal fade" id="viewstatus" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Request Status</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <table className="table mb-4 deplist">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Facility</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {facdata.filter(row => row.Department === logInfo.Department || row.Department === 'Not Applicable' || row.Department === 'Academic Branch').map((row) => (

                                        <tr >
                                            <td></td>
                                            <td>{row.Facility}</td>
                                            {/* <td>{detaileddata.filter(rw=>row.Facility===rw.row.Facility).map((s)=>s.row.Facility)} */}
                                            {/* </td> */}

                                            <td>
                                                {
                                                    detaileddata ? (
                                                        <>
                                                            {detaileddata.filter(a => a.hasOwnProperty(row.Facility)).map((s) =>
                                                                <>

                                                                    <span className={s[row.Facility] === "Approved" ? ('text-success') : ('text-danger')}>
                                                                        {s[row.Facility] === 'Approved' ? ('Approved') : ('Pending')}
                                                                    </span>

                                                                </>
                                                            )}
                                                        </>


                                                    )

                                                        : ('')}




                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
<Footer/>
        </>

    )
}
