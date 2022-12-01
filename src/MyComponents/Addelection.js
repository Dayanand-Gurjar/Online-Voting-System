import React from "react";
import { useState } from "react";
import instance from "./instance";

export default function addelection(){
  const [electionData,setElectionData] =useState({
    electionName:"",
    electionId:0,
    endDate:'2022-11-23'
  })

  const handle=(e)=>{
    const newData={ ...electionData}
    newData[e.target.name]=e.target.value
    setElectionData(newData)
    console.log(newData)
  };
  
  const handleDate=(e)=>{
    const newData={ ...electionData}
    var date=new Date(e.target.value).toLocaleDateString('en-CA');
    newData[e.target.name]=date;
    setElectionData(newData)
    console.log(newData)
  };


  const handleSubmit =(e)=> {
    e.preventDefault();
    //console.log(electionData.electionName)
    instance.post('/elections/add',{electionName:electionData.electionName,
      electionId:electionData.electionId,
      endDate:electionData.endDate
    }).then(function (response) {
      window.alert("New Election Added successfully!");
      window.location='/';
      console.log(response);
    }).catch(function(error){
      window.alert("Some error occurred ! Please try again");
      console.log(error);
    })
  }
    
    return (
        <form className=" d-flex flex-column align-items-center justify-content-center mx-1 mx-md-4 m-5">

                  <div className="d-flex flex-row align-items-center  mb-2 w-50">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill ">
                      <input type="text" onChange={(e)=>handle(e)} name="electionName" className="form-control" />
                      <label className="form-label" htmlFor="form3Example1c">Election Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-2 w-50">
                    <i className="<fas fa-phone fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="number" onChange={(e)=>handle(e)} name="electionId" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">Election Id</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-2 w-50">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="date" onChange={(e)=>handleDate(e)} name="endDate" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c">End Date</label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit"  onClick={handleSubmit} className="btn btn-primary btn-lg">Add Election</button>
                  </div>

                </form>
    );
}