import React, { useEffect, useState } from 'react'
import AdminHome from './AdminHome';
import axios from 'axios';
import swal from "sweetalert";

export default function AdminStaff() {
    const [ranpass, setranpass] = useState(null)

    const [data, setdata] = useState([]);
    const [fac, setfac] = useState([]);
    const [desig, setdesig] = useState([]);
    const [staff, setstaff] = useState([]);
    // const [clerk, setclerk] = useState();
    
    var url = "http://localhost:1000/";
    function generatePassword() {
        var length = 7,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        var nlength = 8, newcharset = retVal + "%&*#$", newpass = ""
        for (var j = 0, m = newcharset.length; j < nlength; ++j) {
            newpass += newcharset.charAt(Math.floor(Math.random() * m));
        }


        return newpass;
    }

    useEffect(() => { 
        setranpass(generatePassword()) 
        getdata()
    }, [])
    const assignpass = (e) => {
        e.preventDefault()
        setranpass(generatePassword())
    }
    function getdata() {
        axios.get(url + "getdep").then((succ) => {
            setdata(succ.data);
        });
        axios.get(url + "getfac").then((succ) => {
            setfac(succ.data);
        });
        axios.get(url + "getstaff").then((succ) => {
            setstaff(succ.data);
        });
        axios.get(url + "getdesig").then((succ) => {
            setdesig(succ.data);
        });
        // axios.get(url + "getclerk").then((succ) => {
        //     setclerk(succ.data);
        // });

    }
    const add = (e) => {
        getdata();
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var obj = {
            FirstName: data.get("fname"),
            LastName: data.get("lname"),
            Department: data.get("dep"),
            Facility: data.get("fac"),
            Designation: data.get("desig"),
            RegisteredBy:localStorage.getItem('UserId'),
            Password: data.get("pass"),
        }
        // console.log(obj)
        axios.post(url + "addstaff", obj).then((succ) => {
            // console.log(succ.data.acknowledged)
            if (succ.data.acknowledged === true) {
                swal("Staff member added successfully", "", "success")
                getdata();
                e.target.reset()
                document.getElementById("cc").click();
            }
            else
                swal(succ.data, "Please try again", "error")
        });
        
    }
    function del(x) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post(url + 'delstaff', { id: x }).then((succ) => {
                        if (succ.data.acknowledged === true) {
                            swal("Staff member deleted", "", "warning");
                            getdata();
                        }
                    })
                }
            });

    }


    return (
        <>
            <div>
                <div className="row p-0 m-0">
                    <div style={{ zIndex: "1" }}>

                        <AdminHome />
                    </div>
                    <div className='dtablestaffback p-2'>
                        <h2 className='text-center'>Manage Staff</h2>
                        <div className="alert alert-primary text-center" role="alert">

                            <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#Clerk">
                                Click here to make a new registration!
                            </button>
                        </div>

                        <table className='dtablestaff '>
                            <thead>
                                <tr>
                                    <th>Serial </th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Department</th>
                                    <th>Registered By</th>
                                    <th>Facility</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map((row)=>(



                                    <tr key={row._id}>
                                    <td>1</td>
                                    <td>{row.FirstName}</td>
                                    <td>{row.LastName}</td>
                                    <td>{row.Department}</td>
                                    <td>{row.RegisteredBy}</td>
                                    <td>{row.Facility}</td>
                                    <td>{row.Designation}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm">Delete</button>
                                        <button className="btn btn-success mx-2 btn-sm">Update</button>
                                    </td>
                                </tr>
                               
                                    ))}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="Clerk" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Register new Staff!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="staff" onSubmit={add}>
                                <div className="row mb-4 p-2">
                                    <div className="col mx-1">
                                        <div className="form-outline">
                                            <input type="text" id="form3Example1" className="form-control" name="fname" placeholder='First name' />

                                        </div>
                                    </div>
                                    <div className="col mx-1">
                                        <div className="form-outline">
                                            <input type="text" id="form3Example2" className="form-control" name="lname" placeholder='Last name' />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                <select className="form-select" aria-label="Default select example" name="dep" required>
                                            <option value="">Select Department</option>
                                            {data.map((row) => (
                                                <option value={row.Department} key={row._id}>{row.Department}</option>
                                            ))}
                                        </select>
                                </div>
                                <div className="form-outline mb-4">
                                <select className="form-select" aria-label="Default select example" name="fac" required>
                                            <option value="">Select Facility</option>
                                            {fac.map((row) => (
                                                <option value={row.Facility} key={row._id}>{row.Facility}</option>
                                            ))}
                                        </select>
                                </div>
                                <div className="form-outline mb-4">
                                <select className="form-select" aria-label="Default select example" name="desig" required>
                                            <option value="">Select Role</option>
                                            {desig.map((row) => (
                                                <option value={row.Designation} key={row._id}>{row.Designation}</option>
                                            ))}
                                        </select>
                                </div>

                                <div className="row mb-4 p-2 d-flex align-items-center">
                                    <label htmlFor="pass">Password</label>
                                    <div className="col mx-1">
                                        <div className="form-outline">
                                            <input type="text" id="pass" className="form-control" maxLength={8} defaultValue={ranpass} readOnly placeholder='Password' />

                                        </div>
                                    </div>
                                    <div className="col mx-1">
                                        <button className="btn btn-dark btn-sm" onClick={assignpass}>Generate other</button>
                                    </div>
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="cc">Close</button>
                            <button type="submit" form="staff" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
