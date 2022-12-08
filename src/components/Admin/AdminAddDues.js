import React, { useEffect, useState } from 'react'
import AdminHome from './AdminHome'
import axios from 'axios';
import swal from "sweetalert";
import { clear } from '@testing-library/user-event/dist/clear';

export default function AdminAddDues() {
    var url = "http://localhost:1000/";
    const [stu, setstu] = useState([]);
    const [tempdata, settempdata] = useState("");
    const [dueid, setdueid] = useState("");

    const [fac, setfac] = useState([]);
    const obj = { idd: localStorage.getItem('UserId') }
    const [logInfo, setLogInfo] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [dues, setdues] = useState([]);
    function getdata() {
        axios.get(url + "getstudent").then((succ) => {
            setstu(succ.data);
        });
        axios.post(url + "loginfo", obj).then((succ) => {
            setLogInfo(succ.data);
        });
        axios.get(url + "getfac").then((succ) => {
            setfac(succ.data);
        });
        axios.get(url + "getdues").then((succ) => {
            setdues(succ.data);
        });
    }
    const handleChange = (e) => {
        e.preventDefault();
        // console.log(e.target.value)
        setSearchInput(e.target.value);

        if (searchInput.length > 0) {
            stu.filter((row) => {
                // console.log(row.FirstName.match(searchInput));
                return row.FirstName.match(searchInput);
            });
        }
    };
    useEffect(() => {
        getdata();
    }, [])

    const add = (e) => {
        getdata();
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var obj = {
            StudentId: tempdata,
            Dues: data.get("due"),
            Reason: data.get("reason"),
            Facility: data.get("fac"),
            penalizeBy: localStorage.getItem('UserId'),
            penalizeByName: logInfo.FirstName + " " + logInfo.LastName,
            Status:"Pending"
        }
        axios.post(url + "adddues", obj).then((succ) => {
            if (succ.data.acknowledged === true) {
                swal("Due added successfully", "", "success")
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
                    axios.post(url + 'deldue', { id: x }).then((succ) => {
                        if (succ.data.acknowledged === true) {
                            swal("Due deleted", "", "warning");
                            getdata();
                        }
                    })
                }
            });

    }
    function clear(x) {
        axios.post(url + 'cleardue', { id: x }).then((succ) => {
            if (succ.data.acknowledged === true) {
                swal("Due cleared", "", "warning");
                getdata();
            }
        })
    }
    return (
        <div>


            <div className="row p-0 m-0">
                <div style={{ zIndex: "1" }}>

                    <AdminHome />
                </div>
                <div className='dtableclerkback p-2'>
                    <h2 className='text-center'>Add Dues</h2>
                    <div className="alert alert-primary text-center" role="alert">
                        {/* 
                        <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#Clerk">
                            Click here to make a new registration!
                        </button> */}
                    </div>

                    <table className='dtableclerk '>
                        <thead>
                            <tr>
                                <th>Serial </th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Department</th>
                                <th>University Roll Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (!localStorage.getItem('Admin') ?
                                    (
                                        stu.filter(row => row.Department === logInfo.Department).map((row) => (
                                            <tr key={row._id} >
                                                <td></td>
                                                <td>{row.FirstName}  </td>
                                                <td>{row.LastName}  </td>
                                                <td>{row.Department}  </td>
                                                <td>{row.UniversityRollNumber}  </td>
                                                <td>
                                                    <button type="button" className="btn btn-primary btn-sm mx-1" data-bs-toggle="modal" onClick={() => settempdata(row._id)} data-bs-target="#adddue">
                                                        Add Due
                                                    </button>
                                                    <button type="button" className="btn btn-primary btn-sm mx-1" data-bs-toggle="modal" onClick={() => settempdata(row._id)} data-bs-target="#viewdue">
                                                        View Dues
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        stu.map((row) => (
                                            <tr key={row._id} >
                                                <td></td>
                                                <td>{row.FirstName}  </td>
                                                <td>{row.LastName}  </td>
                                                <td>{row.Department}  </td>
                                                <td>{row.UniversityRollNumber}  </td>
                                                <td>
                                                    <button type="button" className="btn btn-primary btn-sm mx-1 " data-bs-toggle="modal" onClick={() => settempdata(row._id)} data-bs-target="#adddue">
                                                        Add Due
                                                    </button>
                                                    <button type="button" className="btn btn-primary btn-sm  mx-1" data-bs-toggle="modal" onClick={() => settempdata(row._id)} data-bs-target="#viewdue">
                                                        View Dues
                                                    </button>
                                                </td>
                                            </tr>
                                        ))

                                    )
                                )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal fade" id="adddue" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">

                            <h5 className="modal-title text-center" id="exampleModalLabel">Add Due</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h6>Student Name: {stu.filter(row => row._id === tempdata).map((row => row.FirstName + " " + row.LastName))} </h6>
                            <form id="dues" onSubmit={add}>
                                <div className="form-outline mb-4">
                                    <select className="form-select" aria-label="Default select example" name="fac" required>
                                        <option value="">Select Facility</option>
                                        {fac.filter(row => row.Department === "Not Applicable" || logInfo.Department).map((row) => (
                                            <option value={row.Facility} key={row._id}>{row.Facility}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="row mb-4 p-2 d-flex align-items-center">
                                    <div className="col mx-1">
                                        <div className="form-outline">
                                            <input type="number" id="due" className="form-control" name="due" required placeholder='Amount (in Rs)' />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4 p-2 d-flex align-items-center">
                                    <div className="col mx-1">
                                        <div className="form-outline">
                                            <input type="text" className="form-control" name="reason" required placeholder='Reason of penalty' />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="cc" data-bs-dismiss="modal">Close</button>
                            <button type="submit" form="dues" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* View Dues */}
            <div className="modal fade" id="viewdue" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">

                            <h5 className="modal-title text-center" id="exampleModalLabel">Add Due</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h6>Student Name: {stu.filter(row => row._id === tempdata).map((row => row.FirstName + " " + row.LastName))} </h6>
                            {/* Total Due: {Object.values(stu).reduce((t, {Dues}) => t + Dues, 0)} */}
                            <div className="accordion" id="accordionExample">

                                {dues.filter(row => row.StudentId === tempdata).map((row) => (

                                    <div className="accordion-item" key={row._id}>
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#ab${row._id}`} aria-expanded="false" aria-controls="collapseTwo">
                                                <span>{row.Facility} </span>

                                            </button>
                                        </h2>
                                            <h6 className='mx-4'> Amount: Rs {row.Dues}</h6>

                                            <h6 className='mx-4'>Status:
                                            {row.Status==="Pending"?(

                                                <span style={{color:"red"}}>{row.Status}</span>
                                            ):
                                            
                                            ( <span style={{color:"green"}}>{row.Status}</span>)}
                                            
                                            
                                            </h6>

                                        <div id={`ab${row._id}`} className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                {row.Reason}
                                                <br />
                                                <button type="button" className="btn btn-success btn-sm  mx-1" onClick={() => clear(row._id)} disabled={(row.Status==="Received")?true:false}>
                                                    Clear Due
                                                </button>
                                                <button type="button" className="btn btn-danger btn-sm  mx-1" onClick={() => del(row._id)} >
                                                    Delete Due
                                                </button>

                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="cc" data-bs-dismiss="modal">Close</button>
                            <button type="submit" form="dues" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >




    )
}
