import React from 'react';
import { Link } from "@reach/router";


const WrongPassword = () => {
    return (
        <div>
            <h2>You entered the wrong password!</h2>
            <Link className="btn btn-success m-1" to="/login">Try Again</Link>
            <Link className="btn btn-primary m-1" to="/">Register</Link>
            
        </div>
    );
};

export default WrongPassword;