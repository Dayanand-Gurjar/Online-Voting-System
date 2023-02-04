import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import instance from "./instance";

export default function Nominee() {
    const id=useParams().id;
    console.log(id)
    const [candidateData, setCandidateData] = useState({
       candidateName:"",
       candidateId:"",
       candidateMobile:0,
       candidateBranch:"",
       candidateImageName:localStorage.getItem("imageName"),
       electionId:id
    })

    const handle = (e) => {
        const newData = { ...candidateData }
        newData[e.target.name] = e.target.value
        setCandidateData(newData)
        console.log(newData)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(electionData.electionName)
        instance.post('/candidates/add/'+id, {
            candidateName: candidateData.candidateName,
            candidateId: candidateData.candidateId,
            candidateMobile: candidateData.candidateMobile,
            candidateBranch: candidateData.candidateBranch,
            candidateImageName: candidateData.candidateImageName,
            electionId:candidateData.electionId

        }).then(function (response) {
            window.alert("Candidate  nominated successfully for election!");
            window.location = '/';
            console.log(response);
        }).catch(function (error) {
            window.alert("Some error occurred ! Please try again");
            console.log(error);
        })
    }

    return (
        <form className=" d-flex flex-column align-items-center justify-content-center mx-1 mx-md-4 m-5">

            <div className="d-flex flex-row align-items-center  mb-2 w-50">
                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill ">
                    <input type="text" onChange={(e) => handle(e)} name="candidateName" className="form-control" />
                    <label className="form-label" >Candidate Name</label>
                </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-2 w-50">
                <i className="<fas fa-phone fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                    <input type="number" onChange={(e) => handle(e)} name="candidateId" className="form-control" />
                    <label className="form-label" >Candidate Id</label>
                </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-2 w-50">
                <i className="<fas fa-phone fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                    <input type="tel" onChange={(e) => handle(e)} name="candidateMobile" className="form-control" />
                    <label className="form-label" >Candidate Mobile</label>
                </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-2 w-50">
                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                    <label htmlFor="branch">Branch :</label>
                    <select name="candidateBranch" onChange={(e)=>handle(e)} >
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="CE">CE</option>
                        <option value="EE">EE</option>
                        <option value="CHE">CHE</option>
                        <option value="MHE">MHE</option>
                    </select>
                </div>
            </div>

            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg">Add Candidate</button>
            </div>

        </form>
    );
}