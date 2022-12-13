import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import AdminHome from './AdminHome'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import swal from "sweetalert";
export default function Adminprogressbar() {
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

    var percentage ;
    // const p= data.Received
    if(data){
        const p= data.DuesReceived
        const r=data.DuesPending+data.DuesReceived
        percentage=(p/r*100).toFixed(1)
        // console.log(percentage)
    }
    return (
        <div className=' pbar col-lg-3 col-md-3 col-xs-3 col-sm-3 d-flex flex-column align-items-center' >
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                    backgroundColor: "transparent",
                    textColor: "#00203FFF",
                    pathColor: "#00203FFF",

                    trailColor: "#ccc"
                })}
            />
            <center className='text-wrap p-2'><h4><small>Rs </small><span className='text-success'>{Number(data.DuesReceived)}</span> <small>Of Rs</small> <span className='text-danger'>{Number(data.DuesPending)+Number(data.DuesReceived)}</span> <small>Recieved</small></h4></center>
        </div>
    )
}
