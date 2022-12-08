import React from 'react'
import axios from 'axios';
import swal from "sweetalert";
import AdminNav from './Admin/AdminNav';
import { useState } from 'react';
export default function StudentPanel() {
    var url = "http://localhost:1000/";
    // const [reqstat,setreqstat]=useState(0)

    const sendrequest = () => {
        // console.log(localStorage.getItem('UserId'))
        let obj = { user: localStorage.getItem('UserId') }
        axios.post(url + "sendrequest", obj).then((succ) => {
            // console.log(succ);
            if (succ.data.acknowledged === true) {
            swal("Request sent successfully","", "success")
            }else if(succ.data==="Already exists"){
                swal("Request already sent","", "info")
                // setreqstat(1)

            }
        });
    }
    return (
        <div>
            <div className="py-5">
                <AdminNav />

            </div>
            
            <button className="btn  my-5 btn-primary" onClick={sendrequest}>Request No due Certificate</button>
        </div>
    )
}
