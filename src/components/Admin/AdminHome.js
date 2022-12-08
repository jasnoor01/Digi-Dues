import React from 'react'
import { Link } from 'react-router-dom'
import AdminNav from './AdminNav'

export default function AdminHome() {
    return (
        <div >
            <AdminNav/>
            <div className=' col-lg-2 p-0 mt-5 position-fixed ' >
                <input type="checkbox" name="" id="side-menu-switch" />

                <div className="side-menu p-3 " style={{zIndex:"3 !important"}}>
                    <h3 className='text-center mt-3'>Welcome, User!</h3>
                    <hr />
                    <nav className='sidenav'>
                        <ul className='list-group'>
                            <Link className='list-group-item' to="/admindashboard">Dashboard</Link>
                            <Link to="/admindept" className="list-group-item">Manage Departments</Link>
                            <Link to="/adminfacilities" className="list-group-item">Manage Facilities</Link>
                            <Link to="/adminrole" className="list-group-item">Add Designation</Link>
                            <Link to="/adminclerk" className="list-group-item">Manage Clerk</Link>
                            <Link to="/adminstaff" className="list-group-item">Manage Staff</Link>
                            <li className='list-group-item drop' >
                                <div className="d-flex align-items-center justify-content-between">
                                    <span >Student</span>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                                <ul className="list-group drop-con">
                                    <Link to="/adminstudent" className="list-group-item">Manage Students</Link>
                                    <Link to="/adminadddues" className="list-group-item">Add Dues</Link>
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
