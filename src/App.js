
import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';
import AdminHome from './components/Admin/AdminHome';
import AdminDepartment from './components/Admin/AdminDepartment';
import AdminFacilities from './components/Admin/AdminFacilities';
import AdminClerk from './components/Admin/AdminClerk';
import AdminDesignation from './components/Admin/AdminDesignation';
import AdminStaff from './components/Admin/AdminStaff';
import StudentPanel from './components/StudentPanel';
import AdminManageStudent from './components/Admin/AdminManageStudent';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminAddDues from './components/Admin/AdminAddDues';
import AdminManageRequests from './components/Admin/AdminManageRequests';
function App() {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adminhome" element={<AdminHome />} />

          {localStorage.getItem('Admin') ? (
            <>
              <Route path="/admindept" element={<AdminDepartment />} />
              <Route path="/adminrole" element={<AdminDesignation />} />
              <Route path="/adminclerk" element={<AdminClerk />} />

            </>
          ) : ('')}

          {(localStorage.getItem('UType') === "Clerk" || localStorage.getItem('Admin')) ? (
            <>
              <Route path="/adminfacilities" element={<AdminFacilities />} />
              <Route path="/adminstaff" element={<AdminStaff />} />
            </>
          ) : ('')}
          <Route path="/adminstudent" element={<AdminManageStudent />} />
          <Route path="/adminadddues" element={<AdminAddDues />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/studentdashboard" element={<StudentPanel />} />
          <Route path="/requests" element={<AdminManageRequests />} />

        </Routes>
      </BrowserRouter>

    </>);
}

export default App;
