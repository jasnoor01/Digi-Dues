import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from './firebase'
import axios from 'axios';
import swal from "sweetalert";
// import { EmailJSResponseStatus } from '@emailjs/browser';
import emailjs from "emailjs-com";

const PaymentStatus = ({ match }) => {
    const sendmail = (e) => {
        e.preventDefault();
        emailjs
          .sendForm(
            "service_pdyol49",
            "template_efyjsgb",
            e.target,
            "yaQMvoAXr8rKJhvUu"
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      };

    var url = "http://localhost:1000/";
    const navigate = useNavigate();
    const [values, setValues] = useState({
        success: false,
        error: false
    })
    const par = useParams();

    useEffect(() => {
        // console.log(par.orderId)
        getStatus();
    }, [])
    const { success, error } = values
    const getStatus = () => {
        db.collection('payments').doc('1goOrZhKMl5hJ9VW9ts9').get().then(doc => {
            if (doc) {
                doc.data().paymentHistory.map((data) => {
                    if (data.ORDERID === par.orderId)
                    // if(data.ORDERID===match.params.orderId)
                    {
                        if (data.STATUS === 'TXN_SUCCESS') {
                            // setValues({ ...values, success: true, error: false })

                            if (localStorage.getItem('DueId')) {

                                axios.post(url + 'cleardue', { idd: localStorage.getItem('DueId'),student: localStorage.getItem('UserId') }).then((succ) => {
                                    if (succ.data.acknowledged === true) {

                                        
                                        swal("Payment Successful", "", "success");



                                        navigate('/studentdashboard')
                                        // getdata();
                                    }
                                })
                            }
                            else{

                            }
                        }

                    }
                    else {
                        // setValues({ ...values, success: false, error: "Payment Failed" })
                        swal("Payment failed", "", "error");
                        navigate('/studentdashboard')
                    }
                })
            }
        })
    }


    return (
        <div>
            {
                success && <h1>Payment Succesfully</h1>
            }
            {
                error && <h1>{error}</h1>
            }
        </div>
    )
}

export default PaymentStatus
