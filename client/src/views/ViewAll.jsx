import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, navigate } from "@reach/router";

const ViewAll = (props) => {
  const { logged } = props;
  const [allItems, setAllItems] = useState([]);
// *********************************************************
  useEffect(() => {
    Axios.get("http://localhost:8000/api/items")
      .then((response) => {
        console.log("************", response);
        setAllItems(response.data.results);
      })
      .catch((err) => {
        console.log("Here's an error*******", err);
      });
  }, []);
//   ******************************************************
 
  const handleLogout = () => {
    Axios.get("http://localhost:8000/api/logout", { withCredentials: true })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };
//   **********************************************************
  return (
    <div>
      <h1>Welcome, {logged.firstName} {logged.lastName}</h1>
      <Link  to="/dashboard">List of Users</Link>
      <h3>Pet Shelter</h3>
      
      <Link className="btn btn-success m-1" to="/api/create/item">Add an Pet to The Shelter</Link>
      <Link className="btn btn-primary m-1" to="/api/items">Home</Link>
      <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
      <h3>These pets are looking for a good home</h3>
      <table className="table table-primary col-8 mx-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>(Sorted by:) Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          allItems.sort((a, b) => (a.PetType > b.PetType ? 1 : -1)).map((each, i) => {
              return (
                <tr key={i}>
                  <td>{each.Name}</td>
                  <td>{each.PetType}</td>
                  <td>
                    <Link className ="btn btn-info m-1" to={`/api/oneItem/${each._id}`}>Details</Link>
                    <Link className="btn btn-secondary m-1" to={`/api/update/${each._id}`}>Edit</Link>
                  </td>
                </tr>
                    );
            })
        }
        </tbody>
      </table>
    </div>
  );
};

export default ViewAll;