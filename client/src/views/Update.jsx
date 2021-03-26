import React, { useEffect, useState } from "react";
import Axios from "axios";
import { navigate, Link } from "@reach/router";

const Update = (props) => {
  const { logged } = props;
  const [itemDetail, setItemDetail] = useState({
    Name: "",
    PetType: "",
    Description: "",
    Skill1: "",
    Skill2: "",
    Skille3: "",
  });
  console.log("Here's the item id", props);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    Axios.get(`http://localhost:8000/api/oneItem/${props.id}`)
      .then((response) => {
        console.log("Here's the response call for this item", response);
        setItemDetail(response.data.results);
      })
      .catch((err) => {
        console.log("Here's the error", err);
      });
  }, [errors]);

  // ****************************************************************************
  const changeHandler = (e) => {
    setItemDetail({
      ...itemDetail,
      [e.target.name]: e.target.value,
    });
  };
  // ****************************************************************************
  const submitHandle = (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:8000/api/update/${props.id}`, itemDetail)
      .then((res) => {
        console.log("This is the Form Submission", res);
        if (res.data.results) {
          navigate("/api/items");
        } else {
          console.log("Fix it**********************");
          console.log(res);
          setErrors(res.data.error.errors);
        }
      })
      .catch((err) => console.log("These are the posting errors", err));
  };

  // *************************************************************************
  return (
    <div>
      <h1>
        Welcome, {logged.firstName} {logged.lastName}
      </h1>
      <h3>Pet Shelter</h3>
      <Link className="btn btn-primary m-1" to="/api/items">Home</Link>
      <h5>Edit: {itemDetail.Name}</h5>
      <div className="form-group">
        <form className="col-5 mx-auto" onSubmit={submitHandle}>
          <div>
            <label htmlFor="">Pet Name:</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="Name"
              id=""
              onChange={changeHandler}
              value={itemDetail.Name}
            />
            <br />
            <span className="text-danger">
              {" "}
              {errors.Name ? errors.Name.message : ""}
            </span>
          </div>
          <div>
            <label htmlFor="">Pet Type:</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="PetType"
              onChange={changeHandler}
              value={itemDetail.PetType}
              id=""
            />
            <br />
            <span className="text-danger">
              {" "}
              {errors.PetType ? errors.PetType.message : ""}
            </span>
          </div>
          <div>
            <label htmlFor="">Description:</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="Description"
              onChange={changeHandler}
              value={itemDetail.Description}
              id=""
            />
            <br />
            <span className="text-danger">
              {" "}
              {errors.Description ? errors.Description.message : ""}
            </span>
          </div>
          <br />

          <div>
            <br />
            <h4>Skills (optional):</h4>
            <br></br>
            <input
              className="form-control"
              type="text"
              name="Skill1"
              onChange={changeHandler}
              value={itemDetail.Skill1}
              id=""
            />
            <br />
            <input
              className="form-control"
              type="text"
              name="Skill2"
              onChange={changeHandler}
              value={itemDetail.Skill2}
              id=""
            />
            <br />
            <input
              className="form-control"
              type="text"
              name="Skill3"
              onChange={changeHandler}
              value={itemDetail.Skill3}
              id=""
            />
            <br />
          </div>
          <input type="submit" value="Edit Pet" />
        </form>
      </div>
    </div>
  );
};

export default Update;
