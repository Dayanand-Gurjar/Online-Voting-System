import React, { useState, useEffect } from "react";
import { Link ,Navigate} from "react-router-dom";
import log from "../images/log-photo.webp";



function Login() {
  // React States
  const [usersdatabase, setUsers] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [isAuthenticated, setisAuthenticated] = useState(false);
  

  useEffect(() => {
    fetch("/users/").then((res) => {
      if (res.ok) {
        return res.json()
      }
    }).then(
      jsonRes => { setUsers(jsonRes) }
    )
  }, [])

  //console.log(usersdatabase[1]);

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    console.log(document.forms[0])
    var { uname, pass } = document.forms[0];
    console.log(uname.value );

    // Find user login info
    const userData = usersdatabase.find((user) => user.email === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setisAuthenticated(true);
        localStorage.setItem("user",userData.email);
        localStorage.setItem("isAdmin",userData.isAdmin);
        localStorage.setItem("name",userData.name);
        localStorage.setItem("mobile",userData.mobile);
        localStorage.setItem("imageName",userData.imageName);
        window.location="/"
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <p className="text-danger">{errorMessages.message}</p>
    );

  // JSX code for login form
  // const renderForm = (
  //   <div classNameName="form">
  //     <form onSubmit={handleSubmit}>
  //       <div classNameName="input-container">
  //         <label>Username </label>
  //         <input type="text" placeholder="Enter your username" name="uname" required />
  //         {renderErrorMessage("uname")}
  //       </div>
  //       <div classNameName="input-container">
  //         <label>Password </label>
  //         <input type="password" placeholder="Enter your password" name="pass" required />
  //         {renderErrorMessage("pass")}
  //       </div>
  //       <div classNameName="button-container">
  //         Login
  //       </div>
  //       <div classNameName="registration-text">
  //         Not registered?<Link to="/register">Register here</Link>
  //       </div>
  //     </form>
  //   </div>
  // );
  

  const Form=(
    // <div classNameName="login-form">
    //   <div classNameName="title">Log In</div>
    // </div>
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={log} 
              className="img-fluid" alt="login-pic" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              {/* <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>

                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div> */}

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold fs-2 mx-3 mb-0">Sign In</p>
              </div>

              
              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control form-control-lg"
                  placeholder="Enter a valid username" name="uname" required />
                <label className="form-label" htmlFor="form3Example3">Username</label>
                {renderErrorMessage("uname")}
              </div>


              <div className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                  placeholder="Enter password" name="pass" required />
                <label className="form-label" htmlFor="form3Example4">Password</label>
                {renderErrorMessage("pass")}
              </div>

              <div className="d-flex justify-content-between align-items-center">

                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">Forgot password?</a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg"
                  style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Login</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                  className="link-danger">Register</Link></p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
  return (
    isAuthenticated ? <Navigate to="/"/> : Form
    );

}

export default Login;