import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/vote.png";
;

function Navbar() {
    var user = localStorage.getItem("user");
    var isAdmin = localStorage.getItem("isAdmin");

    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location = '/login';
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <img src={Logo} style={{ width: "30px", height: "30px" }} alt="kjlj" />
                <a className="navbar-brand fs-4 " href="/">Online Voting System</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {(() => {
                            if (!user) {
                                return (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register"> Register </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login"> Login</Link>
                                        </li>
                                    </>
                                )
                            }
                        })()}
                        {(() => {
                            if (user && isAdmin === "true") {
                                console.log("yes i am admin")
                                return (
                                    <>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Elections
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="/addelection">Add Election</a></li>
                                                <li><a className="dropdown-item" href="/elections">View Elections</a></li>
                                                <li><a className="dropdown-item" href="/addelection">Update Election</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/voters"> View voters </Link>
                                        </li>
                                        <li className="nav-item" onClick={logout}>
                                            <Link className="nav-link" >Logout</Link>
                                        </li>
                                    </>);
                            }
                        })()}

                        {(() => {
                            if (user && isAdmin === "false") {
                                console.log("no i am not admin")
                                return (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/elections"> Elections </Link>
                                        </li>
                                        <li className="nav-item" onClick={logout}>
                                            <Link className="nav-link" >Logout</Link>
                                        </li>
                                    </>);
                            }
                        })()}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;