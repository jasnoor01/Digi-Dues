import React, { useEffect, useState } from 'react'
import AdminHome from './AdminHome'
import axios from 'axios';
import swal from "sweetalert";

export default function AdminManageRequests() {

  var url = "http://localhost:1000/";
  const [data, setdata] = useState([]);
  const [logInfo, setLogInfo] = useState([]);
  const obj = { idd: localStorage.getItem('UserId') }

  function getdata() {
    axios.get(url + "getrequests").then((succ) => {
      setdata(succ.data);
    });
    axios.post(url + "loginfo", obj).then((succ) => {
      setLogInfo(succ.data);
    });
  }
  useEffect(() => {
    getdata();
  }, [])
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
          axios.post(url + 'delrequest', { id: x }).then((succ) => {
            if (succ.data.acknowledged === true) {
              swal("Student deleted", "", "warning");
              getdata();
            }
          })
        }
      });

  }
  return (
    <div>
      <div className="row p-0 m-0">
        <div style={{ zIndex: "1" }}>
          <AdminHome />
        </div>
        <div className='dtableclerkback p-2'>
          <h2 className='text-center'>Manage Requests</h2>

          <table className='dtablereq '>
            <thead>
              <tr>
                <th>Serial </th>
                <th>Name</th>
                <th>University Roll No.</th>
                <th>Dues</th>
                <th>Request Time</th>
                <th>Request Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.sort((a, b) => a.TimeStamp > b.TimeStamp ? -1 : 1).filter(row => row.studentDepartment === logInfo.Department).map((row) => (
                <tr key={row._id}>
                  <td></td>
                  <td>{row.studentFirstName} {row.studentLastName}</td>
                  <td>{row.studentUniversityRollNumber}</td>
                  {/* <td>row.studentUniversityRollNumber</td> */}
                  <td>Rs {row.studentDues}</td>
                  <td>{row.TimeStamp}</td>
                  <td>{row.requestStatus}</td>
                  <td>
                    <button className="btn btn-success btn-sm" >View</button>
                    <button type="button" className="btn btn-sm mx-2 btn-primary" data-bs-toggle="modal" data-bs-target="#update">
                      Update
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={()=>del(row._id)} >Delete</button>
                  </td>
                </tr>
              ))}



            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}
