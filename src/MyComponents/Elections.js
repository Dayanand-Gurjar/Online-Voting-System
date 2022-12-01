
import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Elections() {
    const [electionsdatabase, setElections] = useState([{}]);
    useEffect(() => {
        fetch("/elections/").then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then(
            jsonRes => {
                setElections(jsonRes)
            }
        )
    }, []);
    let currentdate = (new Date().toLocaleDateString('en-CA'));
    console.log(currentdate)
    const OngoingElections = electionsdatabase.filter(election => {
        let prevdate = (election.endDate);
        console.log(prevdate);
        return prevdate > currentdate
    })
    const completed_election = electionsdatabase.filter(election => {
        let prevdate = (election.endDate);
        return prevdate < currentdate
    })

  


return (
    <>
        <div class="text-center text-primary fw-bold m-4">
            <h1>Ongoing Elections</h1>
        </div>
        <div className="d-flex flex-column">
            {
                OngoingElections.map(election => {
                    return <div className="d-flex md-5 p-2 justify-content-center">
                        <div className="col-5 ">
                            <h3 className="">{election.electionName}</h3>
                        </div>
                        <div className="col-1 btn btn-success m-1 text-white">
                            <Link to={"/votepage/"+election.electionId} className="text-decoration-none text-white"><h5>Vote</h5></Link></div>
                        <div className="col-1 btn btn-secondary m-1 text-white">
                            <Link to={"/nominee/"+election.electionId} className="text-decoration-none text-white"><h5>Nominee</h5></Link></div>
                    </div>

                })
            }
        </div>
        <div className="text-center text-primary fw-bold m-4">
            <h1>Completed Elections</h1>
        </div>
        <div className="conatiner-md">
            {
                completed_election.map(election => {
                    return <div className="d-flex md-5 p-2 justify-content-center">
                        <div className="col-6 ">
                            <h3 className="">{election.electionName}</h3>
                        </div>
                        <div className="col-1 btn btn-success m-1 text-decoration-none" >
                            <Link to={"/result/"+election.electionId}  className="text-decoration-none text-white"><h5>Result</h5></Link></div>

                    </div>
                })
            }
        </div>
    </>
);
}
export default Elections;