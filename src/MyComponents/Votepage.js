
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import politician from "../images/politician.png"
import instance from "./instance";

function Votepage() {
    const id = useParams().id;
    console.log(id)
    const [candidateDatabase, setCandidates] = useState([{}]);
    const [votesData, setVotesData] = useState([{}])
    let [active, setStateActive] = useState(true)
    useEffect(() => {
        instance.get('/candidates/' + id).then(function (response) {
            setCandidates(response.data);
        })
    }, [active])

    useEffect(() => {
        (async () => {
          try {
            const uid = localStorage.getItem('user');
            console.log(uid);
            const votes = await instance.get('/votesinfo/' + uid + '/' + id);
            setVotesData(votes.data);
            console.log(votesData.length);
            if (votesData.length !== 0) {
                setStateActive(false);
            }else{
                setStateActive(true)
            }
          } catch (err) {
            console.log('Error occured when fetching votes');
          }
        })();
      }, [active]);

    const handleVoting = (id, eid, uid) => {
        if (active === false) {
            window.alert("You have already voted for this election. So you can't vote any more");
            return;
        }
        let pass = window.confirm("Are you sure to vote ?");
        if (pass === true) {
            instance.post('/candidates/updateVote/' + id + '/' + eid + '/' + uid);
            window.alert(`Thank you for Voting !\n Your vote to candidate [id:${id}] has been registered`)
            setStateActive(false);
        }
        return;
    }

    return (
        (candidateDatabase.length === 0) ?
            (<><img src={politician} className="mx-auto d-block" alt="politician" /><h3 className="text-center my-5 text-danger"> No candidates for this election</h3></>) :
            <>
                <div className="header m-3 text-center"><h1>Candidates </h1></div>
                <img src={politician} className="mx-auto d-block" alt="politician" />
                <div className="container d-flex flex-column justify-content-center align-items-center">
                    {
                        candidateDatabase.map(candidate => {
                            console.log(candidate.candidateImageName)
                            return (<div className="card w-50 mx-5 my-4 px-3">
                                <div className="row">
                                    <div className="col-md-4 align-self-center"  >
                                        <div className="m-3">
                                            <img src={`../userPhotos/${candidate.candidateImageName}`} alt="hsdk" className="img-fluid rounded" style={{ height: "180px" }} />
                                        </div>
                                    </div>
                                    <div className="col-md-8 p-2">
                                        <h4 className="card-title m-2">Candidate Details : </h4>
                                        <h6> Name: {candidate.candidateName}</h6>
                                        <h6> ID: {candidate.candidateId}</h6>
                                        <h6>Phone :{candidate.candidateMobile}</h6>
                                        <h6>Branch: {candidate.candidateBranch}</h6>
                                        <button type="button" onClick={() => handleVoting(candidate.candidateId, candidate.electionId, localStorage.getItem('user'))} class="btn btn-primary w-25">Vote</button>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </>
    );
}
export default Votepage;