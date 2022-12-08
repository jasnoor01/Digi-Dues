import React, { useEffect, useState } from 'react'
import AdminHome from './AdminHome'
import axios from 'axios';
import swal from "sweetalert";

export default function AdminClerk() {
    const [ranpass, setranpass] = useState(null)
    const [form, setform] = useState(0)
    const [read, setread] = useState(true)
    const [dep, setdep] = useState([])
    const [tempdata, settempdata] = useState([])
    const [stu, setstu] = useState([])
    // const [data, setdata] = useState([]);
    // const [clerk, setclerk] = useState();
    function getdata() {
        axios.get(url + "getdep").then((succ) => {
            setdep(succ.data);
        });
        axios.get(url + "getstudent").then((succ) => {
            setstu(succ.data);
        });
    }

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
        getdata();
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
            FirstName: data.get("fName"),
            LastName: data.get("lName"),
            JoiningYear: data.get("jYear"),
            PassingYear: data.get("pYear"),
            UniversityRollNumber: data.get("urn"),
            PermanentAddress: data.get("pAddress"),
            Department: data.get("dep"),
            RegisteredBy: localStorage.getItem('UserId'),
            Password: data.get("pass"),
            Contact: data.get("contact"),
            BankStatus: "Unregistered",
            FatherName: "",
            CollegeRollNo: "",
            SavingBankAcNo: "",
            BankName: "",
            BranchAddress: "",
            BankPhoneNumber: "",
            BenificiaryName: "",
            CodeType: "",
            Code: ""
        }
        // console.log(obj)
        axios.post(url + "addstudent", obj).then((succ) => {
            // console.log(succ.data.acknowledged)
            if (succ.data.acknowledged === true) {
                swal("Student Added Successfully", "", "success")
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
                    axios.post(url + 'delstudent', { id: x }).then((succ) => {
                        if (succ.data.acknowledged === true) {
                            swal("Student deleted", "", "warning");
                            getdata();
                        }
                    })
                }
            });

    }

    function update(e) {
        e.preventDefault();
        getdata();
        var data = new FormData(e.currentTarget);
        var obj = {
            idd: tempdata.id,
            FirstName: data.get("fName"),
            LastName: data.get("lName"),
            JoiningYear: data.get("jYear"),
            UniversityRollNumber: data.get("urn") ,
            PassingYear: data.get("pYear"),
            PermanentAddress: data.get("pAddress"),
            Department: data.get("dep"),
            RegisteredBy: localStorage.getItem('UserId'),
            Password: data.get("pass"),
            Contact: data.get("contact"),
            BankStatus: "Unregistered",
            FatherName: data.get("fName"),
            CollegeRollNo:data.get("crn"),
            SavingBankAcNo: data.get("sban"),
            BankName: data.get("bankName"),
            BranchAddress: data.get("branchAdress"),
            BankPhoneNumber: "",
            BenificiaryName: "",
            CodeType: "",
            Code: ""
        }

        // if (tempdata.UniversityRollNumber !== data.get("urn")) {
        //     obj = { ...obj, UniversityRollNumber: data.get("urn") }
        // }

        axios.post(url + 'updatestudent', obj).then((succ) => {
            if (succ.data.acknowledged === true) {
                swal("Student Updated", "", "success");
                getdata();
                e.target.reset()
                document.getElementById("cc").click();
            } else {
                swal(succ.data, "Please try again", "error")
            }
        })

    }

    if (dep) {
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
                                    {stu.map((row) => (

                                        <tr key={row._id}>
                                            <td></td>
                                            <td>{row.FirstName}</td>
                                            <td>{row.LastName}</td>
                                            <td>{row.UniversityRollNumber}</td>
                                            <td>{row.Department}</td>
                                            <td>{row.RegisteredByName}</td>
                                            <td>{row.PassingYear}</td>
                                            <td>{row.BankStatus}</td>
                                            <td>
                                                <div className='btn-group-sm-vertical btn-group-xs-vertical'>

                                                    <button type="button" className="btn btn-primary mx-2 my-1 btn-sm" data-bs-toggle="modal" data-bs-target="#vstu" onClick={
                                                        () => {
                                                            setread(true)

                                                            settempdata({
                                                                id: row._id,
                                                                FirstName: row.FirstName,
                                                                LastName: row.LastName,
                                                                JoiningYear: row.JoiningYear,
                                                                PassingYear: row.PassingYear,
                                                                UniversityRollNumber: row.UniversityRollNumber,
                                                                PermanentAddress: row.PermanentAddress,
                                                                Department: row.Department,
                                                                RegisteredBy: row.RegisteredBy,
                                                                Password: row.Password,
                                                                Contact: row.Contact,
                                                                BankStatus: row.BankStatus,
                                                                FatherName: row.FatherName,
                                                                CollegeRollNo: row.CollegeRollNo,
                                                                SavingBankAcNo: row.SavingBankAcNo,
                                                                BankName: row.BankName,
                                                                BranchAddress: row.BranchAddress,
                                                                BankPhoneNumber: row.BankPhoneNumber,
                                                                BenificiaryName: row.BenificiaryName,
                                                                CodeType: row.CodeType,
                                                                Code: row.Code,

                                                            })




                                                        }}>
                                                        View
                                                    </button>

                                                    {/* <button className="btn btn-danger mx-2 my-1 btn-sm">Delete</button> */}
                                                    <button className="btn btn-danger btn-sm" onClick={() => del(row._id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}



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
                                <form id="student" onSubmit={add}>
                                    <div className="row mb-4 p-2">
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example1" className="form-control" name='fName' placeholder='First name' />

                                            </div>
                                        </div>
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example2" className="form-control" name="lName" placeholder='Last name' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <select className="form-select" name="dep" aria-label="Default select example" required>

                                            <option value="">Select Department</option>
                                            {dep.map((row) => (
                                                <option value={row.Department} key={row._id}>{row.Department}</option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className="row mb-4 p-2">
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="number" id="form3Example2" className="form-control" name="jYear" placeholder='Joining Year' />
                                            </div>
                                        </div>
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="number" id="form3Example2" className="form-control" name="pYear" placeholder='Passing Year' />
                                            </div>
                                        </div>
                                        <div className="col mx-1">
                                            <div className="form-outline">
                                                <input type="number" id="form3Example2" className="form-control" name="urn" placeholder='University Roll Number' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4 p-2">

                                        <div className="form-outline">
                                            <input type="text" id="form3Example2" className="form-control" name="pAddress" placeholder='Permanent Address' />
                                        </div>

                                    </div>
                                    <div className="row mb-4 p-2">

                                        <div className="form-outline">
                                            <input type="text" id="form3Example2" className="form-control" name="contact" placeholder='Contact No.' />
                                        </div>

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
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" form="student" className="btn btn-primary">Save changes</button>
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
                                    <form id="updateStudent" onSubmit={update}>
                                        <div className="row mb-4 p-2">
                                            <div className="col mx-1">
                                                <div className="form-outline">
                                                    <input type="text" id="vm" className="form-control" name="fName" defaultValue={tempdata.FirstName} placeholder='First name' readOnly={(read) ? (true) : (false)} />

                                                </div>
                                            </div>
                                            <div className="col mx-1">
                                                <div className="form-outline">
                                                    <input type="text" id="vm" className="form-control" name="lName" placeholder='Last name' defaultValue={tempdata.LastName} readOnly={(read) ? (true) : (false)} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <select className="form-select" aria-label="Default select example" id="vm" name="dep" disabled={(read) ? (true) : (false)}>

                                                <option defaultValue>{tempdata.Department}</option>
                                                {dep.map((row) => (
                                                    <option value={row.Department} key={row._id}>{row.Department}</option>
                                                ))}

                                            </select>

                                        </div>

                                        <div className="row mb-4 p-2">
                                            <div className="col mx-1">
                                                <div className="form-outline">
                                                    <input type="number" id="vm" className="form-control" placeholder='Joining Year' name='jYear' defaultValue={tempdata.JoiningYear} readOnly={(read) ? (true) : (false)} />
                                                </div>
                                            </div>
                                            <div className="col mx-1">
                                                <div className="form-outline">
                                                    <input type="number" id="vm" className="form-control" placeholder='Passing Year' name="pYear" defaultValue={tempdata.PassingYear} readOnly={(read) ? (true) : (false)} />
                                                </div>
                                            </div>
                                            <div className="col mx-1">
                                                <div className="form-outline">
                                                    <input type="number" id="vm" className="form-control" placeholder='University Roll Number'  name="urn" defaultValue={tempdata.UniversityRollNumber} readOnly={(read) ? (true) : (false)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-4 p-2">

                                            <div className="form-outline">
                                                <input type="number" id="vm" className="form-control" placeholder='Contact Number' name="contact" defaultValue={tempdata.Contact} readOnly={(read) ? (true) : (false)} />
                                            </div>

                                        </div>
                                        <div className="row mb-4 p-2">

                                            <div className="form-outline">
                                                <input type="text" id="vm" className="form-control" placeholder='Permanent Address' name='pAddress' defaultValue={tempdata.PermanentAddress} readOnly={(read) ? (true) : (false)} />
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
                                    <form id="updateStudent" onSubmit={update}>
                                        <div className="form-outline mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="vm" className="form-control" placeholder="Father's Name" name="fName" defaultValue={tempdata.FatherName} readOnly={(read) ? (true) : (false)} />
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <div className="form-outline">
                                                <input type="number" id="vm" className="form-control" placeholder="College Roll No." name="crn" defaultValue={tempdata.CollegeRollNo} readOnly={(read) ? (true) : (false)} />
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <div className="form-outline">
                                                <input type="number" id="vm" className="form-control" placeholder="Saving Bank A/C No." name="sban" defaultValue={tempdata.SavingBankAcNo} readOnly={(read) ? (true) : (false)} />
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="vm" className="form-control" placeholder="Bank Name" name="bankName" defaultValue={tempdata.BankName} readOnly={(read) ? (true) : (false)} />
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="vm" className="form-control" placeholder="Branch Address" name="branchAdress" defaultValue={tempdata.BranchAddress} readOnly={(read) ? (true) : (false)} />
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <div className="form-outline">
                                                <input type="number" id="vm" className="form-control" placeholder="Bank Phone Number" defaultValue={tempdata.BankPhoneNumber} readOnly={(read) ? (true) : (false)} />
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <div className="form-outline">
                                                <input type="number" id="vm" className="form-control" placeholder="Benificiary Name (if any)" defaultValue={tempdata.BenificiaryName} readOnly={(read) ? (true) : (false)} />
                                            </div>
                                        </div>



                                        <div className="d-flex ">
                                            <p>Choose code type :</p>
                                            <div className="form-check mx-4">
                                                <input className="form-check-input" type="radio" name="CodeType" value="NEFT" defaultChecked={(tempdata.CodeType === "NEFT") ? (true) : (false)} id="NEFT" disabled={(read) ? (true) : (false)} />
                                                <label className="form-check-label" htmlFor="NEFT">
                                                    NEFT
                                                </label>
                                            </div>
                                            <div className="form-check mx-4">
                                                <input className="form-check-input" type="radio" name="CodeType" value="IFSC" id="IFSC" defaultChecked={(tempdata.CodeType === "IFSC") ? (true) : (false)} disabled={(read) ? (true) : (false)} />
                                                <label className="form-check-label" htmlFor="IFSC">
                                                    IFSC
                                                </label>
                                            </div>
                                            <div className="form-check mx-4">
                                                <input className="form-check-input" type="radio" name="CodeType" id="RTGS" defaultChecked={(tempdata.CodeType === "RTGS") ? (true) : (false)} value="RTGS" disabled={(read) ? (true) : (false)} />
                                                <label className="form-check-label" htmlFor="RTGS">
                                                    RTGS
                                                </label>
                                            </div>
                                        </div>

                                        <div className="row mb-4 p-2">
                                            <div className="form-outline">
                                                <input type="number" id="vm" className="form-control" placeholder='NEFT/IFSC/RTGS Code' defaultValue={tempdata.Code} readOnly={(read) ? (true) : (false)} />
                                            </div>

                                        </div>


                                    </form>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                {(read) ? (
                                    <button type="button" className="btn btn-primary"  onClick={() => {setread(false) }}>Click to Update</button>
                                ) : (
                                    <button type="submit" form='updateStudent' className="btn btn-success">Save Changes</button>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <div>Loading Data</div>
        )
    }
}
