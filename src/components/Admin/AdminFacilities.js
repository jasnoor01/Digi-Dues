import React, { useEffect, useState } from 'react'
import AdminHome from './AdminHome'
import axios from 'axios';
import swal from "sweetalert";
export default function AdminFacilities() {

    var url = "http://localhost:1000/";

    const [data, setdata] = useState([]);
    const [facdata, setfacdata] = useState([]);
    const [id, setid] = useState();
    const [tempdata, settempdata] = useState(null)
    function getdata() {
        axios.get(url + "getdep").then((succ) => {
            setdata(succ.data);
        });
        axios.get(url + "getfac").then((succ) => {
            setfacdata(succ.data);
        });

    }
    const addfac = (e) => {
        getdata();
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var obj = {
            Facility: data.get("fname"),
            Department: data.get("dep"),
        }
        axios.post(url + "addfac", obj).then((succ) => {
            if (succ.data.acknowledged === true) {
                swal("Facility Added Successfully", "", "success")
                getdata();
            }
            else
                swal(succ.data, "Status Code:" + succ.status, "warning")
            // console.log(succ)
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
                    axios.post(url + 'delfac', { id: x }).then((succ) => {
                        if (succ.data.acknowledged === true) {
                            swal("Department deleted", "", "warning");
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
            idd: id,
            dep: data.get("depa"),
            fac: data.get('fac')
        }
        axios.post(url + 'updatefac', obj).then((succ) => {
            if (succ.data.acknowledged === true) {
                swal("Department Updated", "", "success");
                getdata();
                e.target.reset()
                document.getElementById("cc").click();
            } else {
                swal("Some error occured", "", "error");
            }
        })
    }
   
    useEffect(() => {
        getdata();

    }, []);
    return (
        <div>
            <div className="row p-0 m-0">
                <div style={{ zIndex: "1" }}>

                    <AdminHome />
                </div>

                <section className="vh-100" style={{ backgroundColor: "rgba(8, 172, 180, 0.2)" }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-9 col-xl-7">
                                <div className="card rounded-3">
                                    <div className="card-body p-4">

                                        <h4 className="text-center my-3 pb-3">Manage Facility</h4>

                                        <form className="row row-cols-lg-auto g-3  justify-content-center  mb-4 pb-2" onSubmit={addfac}>
                                            <div className="col-12">
                                                <div className="form-outline mx-3">
                                                    <input type="text" id="form1" className="form-control" placeholder='Facility Name' name="fname" required />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-outline mb-4">
                                                    <select className="form-select" aria-label="Default select example" name="dep">
                                                        <option defaultValue>Not Applicable</option>
                                                        {data.map((row) => (
                                                            <option value={row.Department} key={row._id}>{row.Department}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="">
                                                <button type="submit" className="btn btn-dark mx-3">Add Facility</button>
                                            </div>


                                        </form>

                                        <table className="table mb-4 deplist">
                                            <thead>
                                                <tr>
                                                    <th scope="col">No.</th>
                                                    <th scope="col">Facility</th>
                                                    <th scope="col">Department</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {facdata.map((row) => (

                                                    <tr key={row._id}>
                                                        <td></td>
                                                        <td style={{ wordBreak: "break-all" }}>{row.Facility}</td>
                                                        <td>{row.Department}</td>
                                                        <td><span className="d-flex">

                                                            <button type="submit" className="btn btn-sm btn-danger" onClick={() => del(row._id)}>Delete</button>
                                                            <button type="button" className="btn btn-sm mx-2 btn-primary" onClick=
                                                                {
                                                                    () => {
                                                                        setid(row._id)
                                                                        settempdata({
                                                                            id: row._id,
                                                                            Dep: row.Department,
                                                                            Fac: row.Facility

                                                                        })
                                                                    }
                                                                } data-bs-toggle="modal" data-bs-target="#updep">
                                                                Update
                                                            </button>
                                                        </span>
                                                        </td>
                                                    </tr>
                                                ))}



                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="modal fade" id="updep" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Facility Update</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={update} id="ab">


                                <div className="col-12">
                                    <div className="form-outline ">
                                        <input type="text" id="form1" className="form-control" defaultValue={(tempdata) ? (tempdata.Fac) : ('')} placeholder='Facility Name' name="fac" required />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-outline mt-4">
                                        <select className="form-select" aria-label="Default select example" name="depa">
                                            <option defaultValue>{(tempdata) ? (tempdata.Dep) : ('')}</option>
                                            <option >Not Applicable</option>
                                            {data.map((row) => (
                                                <option value={row.Department} key={row._id}>{row.Department}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="cc" data-bs-dismiss="modal">Close</button>
                            <button type="submit" form='ab' className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
