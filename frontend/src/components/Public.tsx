import { Link, Route } from "react-router-dom";

import React from 'react'
import Login from "../features/users/Login";

const Public = () => {
  return (
    <>
      <div>Public webpage</div>
      <nav>
        <ul>
          <li>
            <Link to="login">Login</Link>
          </li>
        </ul>  
      </nav>
    </>
  )
}

export default Public