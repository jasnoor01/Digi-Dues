
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
import AdminStaff from './components/Admin/AdminStaff';
import AdminDesignation from './components/Admin/AdminDesignation';
import AdminManageStudent from './components/Admin/AdminManageStudent';
import AdminDashboard from './components/Admin/AdminDashboard';
function App() {
  return (
    
    <>
<BrowserRouter>
    <Routes>
        <Route path="/" element={    <Login/>} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/admindept" element={<AdminDepartment/>} />
        <Route path="/adminclerk" element={<AdminClerk/>} />
        <Route path="/adminfacilities" element={<AdminFacilities/>} />
        <Route path="/adminstaff" element={<AdminStaff/>} />
        <Route path="/adminrole" element={<AdminDesignation/>} />
        <Route path="/adminmstudent" element={<AdminManageStudent/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
      </Routes>
</BrowserRouter>
    
    </>);
}

export default App;
