// import React from 'react'
import AdminHome from './AdminHome'
import Adminprogressbar from './Adminprogressbar'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import swal from "sweetalert";
import Footer from '../Footer';
export default function AdminDashboard() {
    var url = "http://localhost:1000/";

    const [data, setdata] = useState([]);
    function getdata() {
        axios.get(url + "getdash").then((succ) => {
            // console.log(succ)
            setdata(succ.data);
        });
    }
    useEffect(() => {
        getdata();

    }, []);
    return (
        <>
            <div>
                <div className="row p-0 m-0">
                    <div style={{ zIndex: "1" }}>

                        <AdminHome />
                    </div>
                    <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-around p-5" style={{ marginTop: "50px", backgroundColor: "rgba(8, 172, 180, 0.2)" }}>
                        <div className="row p-0 m-0">
                            <div className="card databox databox1" style={{ width: "20rem", height: "fit-content" }}>
                                <div className="card-body">
                                    <h3 className="card-title">Requests Recieved</h3>
                                    <h6 className="card-subtitle mb-2 text-muted">Total no of requests made</h6>
                                    <h4 className="card-text">{data.TotalReq}</h4>
                                </div>
                            </div>
                            <div className="card databox databox2 " style={{ width: "20rem", height: "fit-content" }}>
                                <div className="card-body">
                                    <h3 className="card-title ">Requests Pending</h3>
                                    <h6 className="card-subtitle mb-2 text-muted">Total no of pending requests</h6>
                                    <h4 className="card-text">{data.PendingReq}</h4>
                                </div>
                            </div>
                            <div className="card databox databox3" style={{ width: "20rem", height: "fit-content" }}>
                                <div className="card-body">
                                    <h3 className="card-title">Requests Accepted</h3>
                                    <h6 className="card-subtitle mb-2 text-muted">Total amount due  </h6>
                                    <h4 className="card-text">{data.AcceptedReq}</h4>
                                </div>
                            </div>
                            <div className="card databox databox4" style={{ width: "20rem", height: "fit-content" }}>
                                <div className="card-body">
                                    <h3 className="card-title">New Requests</h3>
                                    <h6 className="card-subtitle mb-2 text-muted">Requests made within last 24 hrs</h6>
                                    <h4 className="card-text"> 0</h4>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row m-0" >
                    <div className='p-4'>
                        <Adminprogressbar />
                    </div>

                </div>

            </div>
<Footer/>
        </>

    )
}
