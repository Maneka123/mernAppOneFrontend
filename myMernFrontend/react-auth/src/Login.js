
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, { useState } from "react";

import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();




//import React from 'react'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    
const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    //alert("Submited");
    
// set configurations
const configuration = {
    method: "post",
    //url: "http://localhost:8082/login",
    url:"http://mern-app-one-amber.vercel.app/login",
    data: {
      email,
      password,
    },
  };

  // make the API call
   //make the API call
   axios(configuration)
   .then((result) => {
     // set the cookie
     cookies.set("TOKEN", result.data.token, {
       path: "/",
     });
     // redirect user to the auth page
     window.location.href = "/auth";

     setLogin(true);
   })
   .catch((error) => {
     error = new Error();
   });


  }


    return (
        <>
             <h2>Login</h2>
             <Form onSubmit={(e)=>handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
         {/* display success message */}
         {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
      </Form>
        </>
    )
}

