import React, { useEffect, useState } from 'react'
import AdminHome from './AdminHome'
import axios from 'axios';
import swal from "sweetalert";
import Footer from '../Footer';

export default function AdminManageRequests() {

  var url = "http://localhost:1000/";
  const [data, setdata] = useState([]);
  const [logInfo, setLogInfo] = useState([]);
  const obj = { idd: localStorage.getItem('UserId') }
  const [tempdata, settempdata] = useState("");

  function getdata() {
    axios.get(url + "getrequests").then((succ) => {
      setdata(succ.data);
    });
    axios.post(url + "loginfo", obj).then((succ) => {
      setLogInfo(succ.data);
    });
  }
  function update(e) {
    e.preventDefault();
    getdata();
    var data = new FormData(e.currentTarget);
    var obj = {
      idd: tempdata,
      Status: data.get("status"),
      Message: data.get('message')
    }
    axios.post(url + "updatereq", obj).then((succ) => {
      if (succ.data.acknowledged === true) {
        swal("Status updated", "", "warning");
        getdata();
      }
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
    <>    <div>
      <div className="row p-0 m-0">
        <div style={{ zIndex: "1" }}>
          <AdminHome />
        </div>
        <div className='dtableclerkback p-2'>
          <h2 className='text-center'>Manage Requests</h2>

          <table className='dtablereq '>

            {localStorage.getItem('Admin') ? (
              <>
                <thead>
                  <tr>
                    <th>Serial </th>
                    <th>Name</th>
                    <th>University Roll No.</th>
                    <th>Dues</th>
                    <th>Department</th>
                    <th>Request Time</th>
                    <th>Request Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.sort((a, b) => a.TimeStamp > b.TimeStamp ? -1 : 1).map((row) => (
                      <tr key={row._id}>
                        <td></td>
                        <td>{row.studentFirstName} {row.studentLastName}</td>
                        <td>{row.studentUniversityRollNumber}</td>
                        <td>Rs {row.studentDues}</td>
                        <td>{row.studentDepartment}</td>
                        <td>{row.TimeStamp}</td>
                        <td>{row.requestStatus}</td>
                        <td>
                          <button className="btn btn-success btn-sm" onClick={() => settempdata(row._id)} >View</button>
                          <button type="button" className="btn btn-sm mx-2 btn-primary" data-bs-toggle="modal" onClick={() => settempdata(row._id)} data-bs-target="#update">
                            Update
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => del(row._id)} >Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </>
            ) : (
              <>
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
                        <button className="btn btn-success btn-sm" onClick={() => settempdata(row._id)} >View</button>
                        <button type="button" className="btn btn-sm mx-2 btn-primary" data-bs-toggle="modal" onClick={() => settempdata(row._id)} data-bs-target="#update">
                          Update
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => del(row._id)} >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}


          </table>
        </div>
      </div>

      {/* Update */}
      <div className="modal fade" id="update" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">

              <h5 className="modal-title text-center" id="exampleModalLabel">Add Due</h5>

              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form id="updateduesstatus" onSubmit={update}>


                <div className="col-12">
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="status">Status:</label>
                    <select className="form-select" id="status" aria-label="Default select example" name="status">
                      <option value="Pending">Pending</option>
                      {/* <option value="waiting">Waiting for payment</option> */}
                      <option value="Approved">Approved</option>

                    </select>
                  </div>
                </div>
                <div className="row mb-4 p-2 d-flex align-items-center">
                  <div className="col mx-1">
                    <div className="form-outline">
                      <input type="text" id="message" className="form-control" name="message" placeholder='Message for student' />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="submit" form="updateduesstatus" className="btn btn-success" >Update</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>


            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <Footer/> */}
    </>
  )
}
