
import { Link } from 'react-router-dom'
import AdminNav from './AdminNav'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function AdminHome() {
    var url = "http://localhost:1000/";

    const obj = { idd: localStorage.getItem('UserId') }
    const [logInfo, setLogInfo] = useState([]);
    function getdata() {
        axios.post(url + "loginfo", obj).then((succ) => {
            setLogInfo(succ.data);
        });

    }
    useEffect(() => {
        getdata();
    }, [])
    return (
        <div >
            <AdminNav />
            <div className=' col-lg-2 p-0 mt-5 position-fixed ' >
                <input type="checkbox" name="" id="side-menu-switch" />

                <div className="side-menu p-3 " style={{ zIndex: "3 !important" }}>
                    <h5 className='text-center mt-3'>Welcome, {logInfo.FirstName+" "+ logInfo.LastName}!</h5>
                  <small> <center>({logInfo.Designation})</center></small>
                    <hr />
                    <nav className='sidenav'>
                        <ul className='list-group'>
                            <Link className='list-group-item' to="/admindashboard">Dashboard</Link>
                            <Link to="/adminfacilities" className="list-group-item">Manage Facilities</Link>
                            {localStorage.getItem('Admin') ? (<>
                                <Link to="/admindept" className="list-group-item">Manage Departments</Link>
                                <Link to="/adminrole" className="list-group-item">Add Designation</Link>
                                <Link to="/adminclerk" className="list-group-item">Manage Clerk</Link>
                            </>
                            ) : ('')}
                            {localStorage.getItem('UType') === "Clerk" || localStorage.getItem('Admin') ? (
                                <>
                                    <Link to="/adminstaff" className="list-group-item">Manage Staff</Link>
                                </>
                            ) : ('')}

                            <li className='list-group-item drop' >
                                <div className="d-flex align-items-center justify-content-between">
                                    <span >Student</span>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                                <ul className="list-group drop-con">
                                    <Link to="/adminstudent" className="list-group-item">Manage Students</Link>
                                    <Link to="/adminadddues" className="list-group-item">Manage Dues</Link>
                                    <Link to="/requests" className="list-group-item">Manage Requests</Link>
                                </ul>
                            </li>
                        </ul>


                    </nav>
                    <label htmlFor="side-menu-switch">
                        <i className="fas fa-angle-right"></i>
                    </label>
                </div>
            </div>

        </div>
    )
}
