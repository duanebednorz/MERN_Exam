import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, navigate } from "@reach/router";

const Details = (props) => {
  const { logged } = props;
  console.log("Here's the props info yo", props);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [itemDetail, setItemDetail] = useState({
    Name: "",
    PetType: "",
    Description: "",
    Skill1: "",
    Skill2: '',
    Skill3:'',
  });
  useEffect(() => {
    Axios.get(`http://localhost:8000/api/oneItem/${props.id}`)
      .then((response) => {
        console.log("Here's the response call for this item", response);
        setItemDetail(response.data.results);
      })
      .catch((err) => {
        console.log("Here's the error", err);
      });
  }, [deleteClicked]);

  const deleteClickHandler = (e, id) => {
    console.log("Deleting this", props.id);
    Axios.delete(`http://localhost:8000/api/delete/${props.id}`)
      .then((response) => {
        console.log("Just deleted", response);
        setDeleteClicked(!deleteClicked);
        navigate("/api/items")
      })
      .catch((err) => {
        console.log("Here's some deleting errors", err);
      });
  };

  return (
    <div>
      <h1>View this Item</h1>
      <h2>Welcome, {logged.firstName} {logged.lastName}</h2>
      <Link className="btn btn-success m-1" to="/api/create/item">Add New Pet</Link>
      <Link className="btn btn-primary m-1" to="/api/items">Link to pet list page</Link>
      
        <button onClick= {(e) => {if(window.confirm('Are you sure to adopt this pet?')){ deleteClickHandler(e, props._id)};}} className="btn btn-warning m-1 ">Adopts this pet</button>
    
      <h3>Details about: {itemDetail.Name}</h3>
      {/* <p>Player id: {props.id}</p> */}
      <p>Pet Type: {itemDetail.PetType}</p>
      <p>Description: {itemDetail.Description}</p>
      <div className="card-body col-5 mx-auto">
      <ul className="list-group">
        <h4>Skills:</h4>
        <li className="list-group-item">{itemDetail.Skill1}</li>
        <li className="list-group-item">{itemDetail.Skill2}</li>
        <li className="list-group-item">{itemDetail.Skill3}</li>
      </ul>
      </div>
    </div>
  );
};

export default Details;