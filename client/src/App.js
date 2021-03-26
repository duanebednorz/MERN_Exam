import React, { useState, useEffect} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./views/Registration";
import Main from "./views/Main";
import Login from "./views/Login";
import { Router} from "@reach/router";
import ViewAll from "./views/ViewAll";
import Create from "./views/Create";
import Details from "./views/Details";
import Update from "./views/Update";
import WrongPassword from "./views/WrongPassword";


function App() {
  const [logged, setLogged] = useState(null);
  return (
    <div className="App">
      <Router>
        <Registration 
          path="/" 
          setLogged={setLogged}
          ></Registration>
        <Login 
          path="/login" 
          setLogged={setLogged}
          ></Login>
        <Main 
          path="/dashboard" 
          logged={logged} 
          setLogged={setLogged}
          ></Main>
        <ViewAll
          path="/api/items"
          logged={logged}
          setLogged={setLogged}
        ></ViewAll>
        <Create
          path="/api/create/item"
          logged={logged}
          setLogged={setLogged}
        ></Create>
        <Details
          path="/api/oneItem/:id"
          logged={logged}
          setLogged={setLogged}
        ></Details>
        <Update
          path="/api/update/:id"
          logged={logged}
          setLogged={setLogged}
        ></Update>
        <WrongPassword
          path ="/wrongpassword"
        ></WrongPassword>
      </Router>
    </div>
  );
}

export default App;
