import React, { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./App.css"

function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () =>{
    sessionStorage.removeItem("token");
    navigate("/login");
    window.location.reload();         // refresh the page
  }

  const userdata = JSON.parse(sessionStorage.getItem("token"));
  useEffect(()=>{
    if(!userdata){
      navigate("/");
    }
  },[])

  return (
    <div className="navbar">
      <div className="title">Task Manager</div>
      {userdata? (

      <div className="">
        <Link to="/signup" onClick={handleLogout} className="signout">Sign out</Link>
      </div>
      ):(

      <div className="login">
        <Link to="/signup" className="sign">
          Sign up
        </Link>
        <Link to="/login" className="log">
          Login
        </Link>
      </div>
      )
    }
    </div>
  );
}

export default Navbar;
