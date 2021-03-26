import React, { useEffect, useState } from "react";
import Axios from "axios";
import { navigate, Link } from "@reach/router";

const Main = (props) => {
  const { logged, setLogged } = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/users", { withCredentials: true })
      .then((response) => setUsers(response.data.results))
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);
  const handleLogout = () => {
    Axios.get("http://localhost:8000/api/logout", { withCredentials: true })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <h2>Welcome, {logged.firstName} {logged.lastName}</h2>
      <Link className="btn btn-primary m-1" to="/api/items">Link to item list page</Link>
      <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
      <h3>Registered Users:</h3>
      <table className="table table-primary col-8 mx-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
          users.map((each, i) => {
            return (
              <tr key={i}>
                <td>{each.firstName} {each.lastName}</td>
                <td>{each.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Main;