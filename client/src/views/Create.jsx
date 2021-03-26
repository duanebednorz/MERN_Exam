import React, { useState } from "react";
import Axios from "axios";
import FormInput from "../components/FormInput";
import { navigate, Link } from "@reach/router";

const Create = (props) => {
  const { logged, setLogged } = props;

  const initialFormInfo = {
    Name: "",
    PetType: "",
    Description: "",
    Skill1: "",
    Skill2: '',
    Skill3:'',
  };
  const [formInfo, setFormInfo] = useState(initialFormInfo);
  const [errors, setErrors] = useState(initialFormInfo);
  // **************************************************
  const changeHandler = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };
  //   ************************************************
  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/api/create/item", formInfo)
      .then((response) => {
        console.log("This is the New Item Form Submission post:", response);
        if (response.data.results) {
          navigate("/api/items");
        } else {
          console.log("Create New Item******Fix it**********************");
          setErrors(response.data.errors);
        }
      })
      .catch((error) =>
        console.log("These are the form submission post errors:", error)
      );
  };
  return (
    <div className="container">
    <div>
        <h1>Welcome, {logged.firstName} {logged.lastName}</h1>
      <form className="col-5 mx-auto" onSubmit={submitHandler}>
        <h3>Know a pet needing a home?</h3>
        <Link className="btn btn-primary m-1" to="/api/items">Home</Link>
        <FormInput
          name="Name"
          value={formInfo.Name}
          error={errors.Name}
          handleChange={changeHandler}
          label="Name:"
          type="text"
        />
        <FormInput
          name="PetType"
          value={formInfo.PetType}
          error={errors.PetType}
          handleChange={changeHandler}
          label="Pet Type:"
          type="text"
        />
        <FormInput
          name="Description"
          value={formInfo.Description}
          error={errors.Description}
          handleChange={changeHandler}
          label="Description:"
          type="text"
        />
        <br />
        <h3>Skills (optional):</h3>
        <div>
        <FormInput
          name="Skill1"
          value={formInfo.Skill1}
          error={errors.Skill1}
          handleChange={changeHandler}
          label="Skill1:"
          type="text"
        />
        <FormInput
          name="Skill2"
          value={formInfo.Skill2}
          error={errors.Skill2}
          handleChange={changeHandler}
          label="Skill 2:"
          type="text"
        />
        <FormInput
          name="Skill3"
          value={formInfo.Skill3}
          error={errors.Skill3}
          handleChange={changeHandler}
          label="Skill 3:"
          type="text"
        />
        <FormInput submitValue="Add Pet" type="submit" />
        <br />
        </div>
      </form>
    </div>
    </div>
  );

};
export default Create;