import React, { useEffect, useState } from 'react'
import AdminHome from './AdminHome'
import axios from 'axios';
import swal from "sweetalert";
import Footer from '../Footer';

export default function AdminClerk() {
    const [ranpass, setranpass] = useState(null)
    var url = "http://localhost:1000/";

    const [data, setdata] = useState([]);
    const [clerk, setclerk] = useState();
    const [tempdata, settempdata] = useState(null)
    function getdata() {
        axios.get(url + "getdep").then((succ) => {
            setdata(succ.data);
        });
        axios.get(url + "getclerk").then((succ) => {
            setclerk(succ.data);
        });

    }
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

    const add = (e) => {
        getdata();
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var obj = {
            UserName: data.get("username"),
            FirstName: data.get("fname"),
            LastName: data.get("lname"),
            Department: data.get("dep"),
            RegisteredBy: localStorage.getItem('UserId'),
            Password: data.get("pass"),
            Designation:"Clerk"
        }
        // console.log(obj)
        axios.post(url + "addclerk", obj).then((succ) => {
            // console.log(succ.data.acknowledged)
            if (succ.data.acknowledged === true) {
                swal("Clerk Added Successfully", "", "success")
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
                    axios.post(url + 'delclerk', { id: x }).then((succ) => {
                        if (succ.data.acknowledged === true) {
                            swal("Clerk deleted", "", "warning");
                            getdata();
                        }
                    })
                }
            });

    }
    const update = (e) => {
        e.preventDefault();
        getdata();
        var data = new FormData(e.currentTarget);
        var obj = {
            idd: tempdata.id,
            // UserName: data.get("username"),
            FirstName: data.get("fname"),
            LastName: data.get("lname"),
            // Department: data.get("dep"),
            // Password: data.get("pass"),
        }
        if (tempdata.uName !== data.get("username")) {
            obj = { ...obj, UserName: data.get("username") }
        }
        // console.log(obj)
        axios.post(url + 'updateclerk', obj).then((succ) => {
            if (succ.data.acknowledged === true) {
                swal("Clerk Updated", "", "success");
                getdata();
                e.target.reset()
                document.getElementById("cc").click();
            } else {
                swal(succ.data, "Please try again", "error")
            }
        })
    }




    if (clerk) {
        return (
            <>
                <div>
                    <div className="row p-0 m-0">
                        <div style={{ zIndex: "1" }}>

                            <AdminHome />
                        </div>
                        <div className='dtableclerkback p-2 '>
                            <h2 className='text-center'>Manage Clerk</h2>
                            <div className="alert alert-primary text-center" role="alert">

                                <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#Clerk">
                                    Click here to make a new registration!
                                </button>
                            </div>

                            <table className='dtableclerk '>
                                <thead>
                                    <tr>
                                        <th>Serial </th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Department</th>
                                        <th>User Name</th>
                                        <th>Registered By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clerk.map((row) => (

                                        <tr key={row._id}>
                                            <td></td>
                                            <td>{row.FirstName}</td>
                                            <td>{row.LastName}</td>
                                            <td>{row.Department}</td>
                                            <td>{row.UserName}</td>
                                            <td>{row.RegisteredByName}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" onClick={() => del(row._id)}>Delete</button>
                                                <button type="button" className="btn btn-sm mx-2 btn-primary" onClick=
                                                    {
                                                        () => {
                                                            settempdata({
                                                                id: row._id,
                                                                uName: row.UserName,
                                                                fName: row.FirstName,
                                                                lName: row.LastName,
                                                                Dep: row.Department,
                                                                pass: row.Password

                                                            })
                                                        }
                                                    } data-bs-toggle="modal" data-bs-target="#update">
                                                    Update
                                                </button>
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

                                <h5 className="modal-title text-center" id="exampleModalLabel">Register new Clerk!</h5>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form id="clerk" onSubmit={add}>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="form3Example1" className="form-control" name='username' placeholder='User Name' required />

                                    </div>
                                    <div className="row mb-4 p-2">
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example1" className="form-control" name='fname' placeholder='First name' required />

                                            </div>
                                        </div>
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example2" className="form-control" name='lname' placeholder='Last name' required />
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


                                    <div className="row mb-4 p-2 d-flex align-items-center">
                                        <label htmlFor="pass">Password</label>
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="text" id="pass" className="form-control" maxLength={8} defaultValue={ranpass} name="pass" readOnly placeholder='Password' />

                                            </div>
                                        </div>
                                        <div className="col mx-1">
                                            <button className="btn btn-dark btn-sm" onClick={assignpass}>Generate other</button>
                                        </div>
                                    </div>


                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id="cc" data-bs-dismiss="modal">Close</button>
                                <button type="submit" form="clerk" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Update */}
                <div className="modal fade" id="update" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">

                                <h5 className="modal-title text-center" id="exampleModalLabel">Update Clerk!</h5>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form id="clerkup" onSubmit={update}>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="form3Example1" className="form-control" name='username' placeholder='User Name' defaultValue={(tempdata) ? (tempdata.uName) : ('')} required />

                                    </div>
                                    <div className="row mb-4 p-2">
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example1" className="form-control" name='fname' defaultValue={(tempdata) ? (tempdata.fName) : ('')} placeholder='First name' required />

                                            </div>
                                        </div>
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example2" className="form-control" name='lname' defaultValue={(tempdata) ? (tempdata.lName) : ('')} placeholder='Last name' required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <select className="form-select" aria-label="Default select example" name="dep" disabled required>
                                            <option value={(tempdata) ? (tempdata.Dep) : ('')}>{(tempdata) ? (tempdata.Dep) : ('')}</option>
                                            {data.map((row) => (
                                                <option value={row.Department} key={row._id}>{row.Department}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* <div className="row mb-4 p-2 d-flex align-items-center">
                                        <label htmlFor="pass">Password</label>
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="text" id="pass" className="form-control" defaultValue={(tempdata) ? (tempdata.pass) : ('')} maxLength={8} name="pass" placeholder='Password' />
                                            </div>
                                        </div>

                                        <div className="col mx-1">
                                            <button className="btn btn-dark btn-sm" onClick={assignpass}>Generate other</button>
                                        </div>
                                    </div> */}


                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id="cc" data-bs-dismiss="modal">Close</button>
                                <button type="submit" form="clerkup" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>


{/* <Footer/> */}

            </>
        )
    }
    else {
        return (
            <div>Loading Data</div>
        )
    }
}
