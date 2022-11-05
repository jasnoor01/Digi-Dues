import React, { useEffect, useState } from 'react'
import AdminHome from './AdminHome'
import axios from 'axios';
import swal from "sweetalert";

export default function AdminClerk() {
    const [ranpass, setranpass] = useState(null)
    const [form, setform] = useState(0)
    const [read, setread] = useState(true)
    // const [data, setdata] = useState([]);
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
    }, [])
    const assignpass = (e) => {
        e.preventDefault()
        setranpass(generatePassword())
    }

   
    return (
        <>
            <div>
                <div className="row p-0 m-0">
                    <div style={{ zIndex: "1" }}>

                        <AdminHome />
                    </div>
                    <div className='dtableclerkback p-2'>
                        <h2 className='text-center'>Manage Student</h2>
                        <div className="alert alert-primary text-center" role="alert">

                            <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#Clerk">
                                Click here to make a new registration!
                            </button>
                        </div>

                        <table className='dtablestudent '>
                            <thead>
                                <tr>
                                    <th>Serial </th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>University Roll No</th>
                                    <th>Department</th>
                                    <th>Registered By</th>
                                    <th>Passing Year</th>
                                    <th>Bank</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>James</td>
                                    <td>Matman</td>
                                    <td>Chief Sandwich Eater</td>
                                    <td>Chief Sandwich Eater</td>
                                    <td>Chief Sandwich Eater</td>
                                    <td>Chief Sandwich Eater</td>
                                    <td>Registered</td>
                                    <td>
                                        <div className='btn-group-sm-vertical btn-group-xs-vertical'>

                                            <button type="button" className="btn btn-primary mx-2 my-1 btn-sm" data-bs-toggle="modal" data-bs-target="#vstu" onClick={() => { setread(true) }}>
                                                View
                                            </button>

                                            <button className="btn btn-danger mx-2 my-1 btn-sm">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                                


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Registration Modal */}
            <div className="modal fade" id="Clerk" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Register new Student!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row mb-4 p-2">
                                    <div className="col mx-1">
                                        <div className="form-outline">
                                            <input type="text" id="form3Example1" className="form-control" placeholder='First name' />

                                        </div>
                                    </div>
                                    <div className="col mx-1">
                                        <div className="form-outline">
                                            <input type="text" id="form3Example2" className="form-control" placeholder='Last name' />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <select className="form-select" aria-label="Default select example">
                                        <option defaultValue>Select Department</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                    </select>
                                </div>

                                <div className="row mb-4 p-2">
                                    <div className="col mx-1">
                                        <div className="form-outline">
                                            <input type="number" id="form3Example2" className="form-control" placeholder='Joining Year' />
                                        </div>
                                    </div>
                                    <div className="col mx-1">
                                        <div className="form-outline">
                                            <input type="number" id="form3Example2" className="form-control" placeholder='Passing Year' />
                                        </div>
                                    </div>
                                    <div className="col mx-1">
                                        <div className="form-outline">
                                            <input type="number" id="form3Example2" className="form-control" placeholder='University Roll Number' />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4 p-2">

                                    <div className="form-outline">
                                        <input type="text" id="form3Example2" className="form-control" placeholder='Permanent Address' />
                                    </div>

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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



            {/* View Modal */}
            <div className="modal fade" id="vstu" tabIndex="-1" aria-labelledby="vstu" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="vstu">Register new Student!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row m-1">
                                <button className={(form === 0) ? ('btn col-6 active') : ('btn col-6')} onClick={() => setform(0)}>Personal Info</button>
                                <button className={(form === 1) ? ('btn col-6 active') : ('btn col-6')} onClick={() => setform(1)}>Bank Details</button>
                            </div>
                            {(form === 0) ? (
                                <form>
                                    <div className="row mb-4 p-2">
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="text" id="vm" className="form-control" placeholder='First name' readOnly={(read) ? (true) : (false)} />

                                            </div>
                                        </div>
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="text" id="vm" className="form-control" placeholder='Last name' readOnly={(read) ? (true) : (false)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <select className="form-select" aria-label="Default select example" id="vm" disabled={(read) ? (true) : (false)}>
                                            <option defaultValue>Select Department</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                        </select>
                                    </div>

                                    <div className="row mb-4 p-2">
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="number" id="vm" className="form-control" placeholder='Joining Year' readOnly={(read) ? (true) : (false)} />
                                            </div>
                                        </div>
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="number" id="vm" className="form-control" placeholder='Passing Year' readOnly={(read) ? (true) : (false)} />
                                            </div>
                                        </div>
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="number" id="vm" className="form-control" placeholder='University Roll Number' readOnly={(read) ? (true) : (false)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4 p-2">

                                        <div className="form-outline">
                                            <input type="number" id="vm" className="form-control" placeholder='Contact Number' readOnly={(read) ? (true) : (false)} />
                                        </div>

                                    </div>
                                    <div className="row mb-4 p-2">

                                        <div className="form-outline">
                                            <input type="text" id="vm" className="form-control" placeholder='Permanent Address' readOnly={(read) ? (true) : (false)} />
                                        </div>

                                    </div>


                                    {(read) ? ('') : (
                                        <div className="row mb-4 p-2 d-flex align-items-center">
                                            <label htmlFor="pass">Password</label>
                                            <div className="col mx-1">
                                                <div className="form-outline">
                                                    <input type="text" id="pass" className="form-control" maxLength={8} defaultValue={ranpass} readOnly placeholder='Password' />

                                                </div>
                                            </div>
                                            <div className="col mx-1">
                                                <button className="btn btn-dark btn-sm" onClick={assignpass} >Generate other</button>
                                            </div>
                                        </div>

                                    )}


                                </form>
                            ) : (
                                // Bank
                                <form>
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <input type="text" id="vm" className="form-control" placeholder="Father's Name" readOnly={(read) ? (true) : (false)} />
                                        </div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <input type="number" id="vm" className="form-control" placeholder="College Roll No." readOnly={(read) ? (true) : (false)} />
                                        </div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <input type="number" id="vm" className="form-control" placeholder="Saving Bank A/C No." readOnly={(read) ? (true) : (false)} />
                                        </div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <input type="text" id="vm" className="form-control" placeholder="Bank Name" readOnly={(read) ? (true) : (false)} />
                                        </div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <input type="text" id="vm" className="form-control" placeholder="Branch Address" readOnly={(read) ? (true) : (false)} />
                                        </div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <input type="number" id="vm" className="form-control" placeholder="Bank Phone Number" readOnly={(read) ? (true) : (false)} />
                                        </div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <input type="number" id="vm" className="form-control" placeholder="Benificiary Name (if any)" readOnly={(read) ? (true) : (false)} />
                                        </div>
                                    </div>



                                    <div class="d-flex ">
                                        <p>Choose code type :</p>
                                        <div class="form-check mx-4">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="NEFT" />
                                            <label class="form-check-label" htmlFor="NEFT">
                                                NEFT
                                            </label>
                                        </div>
                                        <div class="form-check mx-4">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="IFSC" />
                                            <label class="form-check-label" htmlFor="IFSC">
                                                IFSC
                                            </label>
                                        </div>
                                        <div class="form-check mx-4">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="RTGS" />
                                            <label class="form-check-label" htmlFor="RTGS">
                                                RTGS
                                            </label>
                                        </div>
                                    </div>

                                    <div className="row mb-4 p-2">
                                        <div className="form-outline">
                                            <input type="number" id="vm" className="form-control" placeholder='NEFT/IFSC/RTGS Code' readOnly={(read) ? (true) : (false)} />
                                        </div>

                                    </div>


                                </form>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {(read) ? (
                                <button type="button" className="btn btn-primary" onClick={() => { setread(false) }}>Click to Update</button>
                            ) : (
                                <button type="button" className="btn btn-success" onClick={() => { setread(true) }}>Save Changes</button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
