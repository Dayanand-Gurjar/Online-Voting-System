import React, { useEffect, useState } from "react";
import trophy from "../images/trophy.png"
import { useParams } from "react-router-dom";

import instance from "./instance";

function Result() {
    const id = useParams().id;
    console.log(id);
    const [electionCandidates, setElectionCandidates] = useState([])

    useEffect(() => {
        instance.get("/candidates/" + id).then((res) => {
            setElectionCandidates(res.data);
            console.log(res.data)
        })
    }, [])

    var winnerCandidate, OtherCandidates = [];
    if (electionCandidates.length !== 0) {
        winnerCandidate = electionCandidates[0];
        let index = 0;
        for (let i = 1; i < electionCandidates.length; i++) {
            if (electionCandidates[i].candidateVotes > winnerCandidate.candidateVotes) {
                winnerCandidate = electionCandidates[i];
                index = i;
            }
        }
        for (let j = 0; j < electionCandidates.length; j++) {
            if (j !== index) {
                OtherCandidates.push(electionCandidates[j]);
            }
        }
    }
    console.log(winnerCandidate)

    return (
        (electionCandidates.length === 0) ?
            (<h3 className="text-center my-5 text-danger"> No candidates for this election</h3>) : (
                <>
                    <div className="text-center my-3 "><h1>Winner Of Election {id} </h1></div>
                    <div class="container d-flex flex-row align-items-center justify-content-center" >
                        <div className="row " style={{ height: "400px" }}>
                            <div class="col-3 d-flex align-items-center justify-content-center">
                                <img src={trophy} alt="trophy" className="" style={{ width: "200px", height: "200px" }} />
                            </div>
                            <div className="col-6 d-flex align-items-center justify-content-center">
                                <img src={`../userPhotos/${winnerCandidate.candidateImageName}`} className="" alt="candidate" style={{ width: "180px", height: "250px", borderRadius: "20px" }} />
                                <div className="ps-3">
                                    <h3 className=" ">Candidate Info:</h3>
                                    <h5> Name: {winnerCandidate.candidateName}</h5>
                                    <h5> ID: {winnerCandidate.candidateId}</h5>
                                    <h5>Phone :{winnerCandidate.candidateMobile}</h5>
                                    <h5>Branch: {winnerCandidate.candidateBranch}</h5>
                                    <h5>Total vote: {winnerCandidate.candidateVotes}</h5>
                                </div>
                            </div>
                            <div class="col-3 d-flex align-items-center justify-content-center">
                                <img src={trophy} alt="hsdk" className="" style={{ width: "200px", height: "200px" }} />
                            </div>
                        </div>
                    </div>
                    {(OtherCandidates.length > 0) ?
                        (<div className="header text-center my-5"><h1>Other Candidates </h1></div>):<></>}
                            <div className="row row-cols-1 row-cols-md-4 g-4 mx-5 px-5 my-1 ">
                            {OtherCandidates.map((candidate) => {
                                return (
                                    <div className="col">
                                        <div className="card">
                                            <img src={`../userPhotos/${candidate.candidateImageName}`} className="card-img-top px-5 py-4" alt="candidate" />
                                            <div className="card-body mx-2">
                                                <h3 className="card-title ">Candidate Info:</h3>
                                                <h6> Name: {candidate.candidateName}</h6>
                                                <h6> ID: {candidate.candidateId}</h6>
                                                <h6>Phone :{candidate.candidateMobile}</h6>
                                                <h6>Branch: {candidate.candidateBranch}</h6>
                                                <h6>Total vote: {candidate.candidateVotes}</h6>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            }
                        </div>
                </>
            )
    );
}
export default Result;