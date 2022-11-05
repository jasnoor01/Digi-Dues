import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminNav() {

  const [logcheck, setlogcheck] = useState(localStorage.getItem('UserId'));
  var navi = useNavigate();
 
  const logout = () => {
    setlogcheck(true)
    localStorage.removeItem('UserId')
    localStorage.removeItem('Admin')
    // console.log('a'+ localStorage.getItem('Admin')+'u '+localStorage.getItem('UserId') )
    
    navi('/')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Digi Dues</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>
            </ul>
            <span className="navbar-text" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navbarText">

                {logcheck ? (
                  <li className="nav-item">
                    <button className="btn nav-link" onClick={logout}>Log out</button>

                  </li>

                ) : (


                  <li className="nav-item">
                    <button className="btn nav-link" onClick={() => navi('/')}>Log in</button>
                  </li>
                )}



               
              </ul>
            </span>
          </div>
        </div>
      </nav>

    </div>
  )
}
