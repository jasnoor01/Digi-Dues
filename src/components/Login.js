import React, { useEffect, useState } from 'react'
import axios from 'axios';
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    var navi = useNavigate();
    var url = "http://localhost:1000/";
    const login=(e)=>{
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var obj = {
            UserName: data.get("uname"),
            Password: data.get("password"),
        }
        axios.post(url + "login", obj).then((succ) => {
            
            // console.log(succ.data.status)
            
            // if (succ.data._id){
            //     localStorage.setItem('UserId', succ.data._id);
            //     navi('/admindashboard')
            // }else{
            //     swal(succ.data, "Please try again", "error")
            // }
            if (succ.data.Type==="Admin"){
                localStorage.setItem('Admin', succ.data._id);
                localStorage.setItem('UserId', succ.data._id);
                // console.log(localStorage.getItem('Admin'))
                navi('/admindashboard')
            }else{
                swal(succ.data, "Please try again", "error")
            }
        });

    }
   
    // localStorage.getItem('UserLog')
    
    return (
        <div>
            <section className="background-radial-gradient overflow-hidden" >


                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-7 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                                The best offer <br />
                                <span style={{ color: "hsl(218, 81%, 75%)" }}>for your business</span>
                            </h1>
                            <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                                ab ipsum nisi dolorem modi. Quos?
                            </p>
                        </div>

                        <div className="col-lg-5 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <form onSubmit={login}>



                                        <div className="d-flex flex-row align-items-center mb-4 text-center">
                                            <i className="fa-solid fa-user"></i>
                                            <div className="form-outline flex-fill mb-0 ">
                                                <input type="text"  className="form-control" placeholder='User Name' name="uname" required />

                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4 text-center">
                                            <i className="fas fa-lock fa-lg"></i>
                                            <div className="form-outline flex-fill mb-0 ">
                                                <input type="password"  className="form-control" placeholder='Password' name="password" required />

                                            </div>
                                        </div>
                                        {/* <div className="form-outline mb-4">
                                            <input type="password" id="form3Example4" className="form-control" placeholder='Password' />

                                        </div> */}



                                        <button type="submit" className="btn btn-primary col-lg-12">
                                            Login
                                        </button>

                                        <div className="text-center">
                                            <p>or sign up with:</p>
                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-facebook-f"></i>
                                            </button>

                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-google"></i>
                                            </button>

                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-twitter"></i>
                                            </button>

                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-github"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
