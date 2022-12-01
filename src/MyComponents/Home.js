import "./Home.css";
import React from "react";
import voting from "../images/Voting-amico.svg";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
          
            <div className="d-flex flex-row">
                <div className="d-flex flex-column justify-content-center align-items-left ms-5 ps-5" style={{height:"500px",width:"600px"}}>
                    <div className="fs-1 text-primary fw-bold ">
                        Changing <br /> The way of Voting
                    </div>
                    <div className="fs-3 text-secondary my-3">
                        Experience a new way of Voting aligned with a safe and secure process 
                    </div>
                    <div className="btn btn-primary fs-4 text-align-left my-3" style={{width:"150px"}}>
                       <Link to="/elections" className="text-decoration-none text-white" >Vote Now</Link>
                    </div>
                </div>
                {/* <a href="../images/Voting-amico.svg" download>hello</a> */}
                <div className="d-flex flex-column" style={{height:"100%",width:"500px"}}>
                <img src={voting} alt="this"/>
                </div>
            </div>
        </>
    );
}
export default Home;