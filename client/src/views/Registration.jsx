import React, { useState } from "react";
import Axios from "axios";
import UserInput from "../components/UserInput";
import { Link, navigate } from "@reach/router";

const Registration = (props) => {
  const { setLogged } = props;

  const initialRegistration = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [registration, setRegistration] = useState(initialRegistration);
  const [errors, setErrors] = useState(initialRegistration);
// ********************************************************
  const changeHandler = (e) => {
    setRegistration({
      ...registration,
      [e.target.name]: e.target.value,
    });
  };
//   ******************************************************
  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/api/register", registration, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        if (response.data.user) {
          setLogged(response.data.user);
          navigate("/dashboard");
        } else {
          setErrors(response.data);
        }
      })
      .catch((error) => console.log(error));
  };
// ********************************************************
  return (
    <div>
      <form className="col-5 mx-auto" onSubmit={submitHandler}>
        <h2>Register</h2>
        <UserInput
          name="firstName"
          value={registration.firstName}
          error={errors.firstName}
          handleChange={changeHandler}
          label="First Name:"
          type="text"
        />
        <UserInput
          name="lastName"
          value={registration.lastName}
          error={errors.lastName}
          handleChange={changeHandler}
          label="Last Name:"
          type="text"
        />
        <UserInput
          name="email"
          value={registration.email}
          error={errors.email}
          handleChange={changeHandler}
          label="Email:"
          type="email"
        />
        <UserInput
          name="password"
          value={registration.password}
          error={errors.password}
          handleChange={changeHandler}
          label="Password:"
          type="password"
        />
        <UserInput
          name="confirmPassword"
          value={registration.confirmPassword}
          error={errors.confirmPassword}
          handleChange={changeHandler}
          label="Confirm Password:"
          type="password"
        />
        <UserInput submitValue="Register" type="submit" />
        <br />
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
};

export default Registration;