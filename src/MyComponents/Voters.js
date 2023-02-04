import React from "react";
import instance from "./instance";
import { useState, useEffect } from "react";

export default function voters() {
  const [userDatabase, setUsers] = useState([{}]);
  useEffect(() => {
    instance.get('/users/').then(function (response) {
      setUsers(response.data);
      console.log(response.data)
    })
  }, [])

  var serial=0;
  var adminfield="Admin";
  return (
    <>
      <div className="text-center fw-bold fs-2 m-3">
        Voters List
      </div>
      <table class="table m-3 table-hover">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">IsAdmin</th>
          </tr>
        </thead>
        <tbody>
          {
            userDatabase.map((user) => {
              serial+=1;
              if(user.isAdmin!==true){
                  adminfield="Not Admin";
              }
              return (
                <tr>
                  <th scope="row">{serial}</th>
                  <td> {user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{adminfield}</td>
                </tr>
              )
            })}

        </tbody>
      </table>
    </>
  );
}