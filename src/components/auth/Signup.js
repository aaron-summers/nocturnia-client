import React, { useState, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
// import { Link } from 'react-router-dom';

const Signup = ({submit}) => {
  const [formData, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { username, email, password } = formData;

  const handleChange = event =>
    setForm({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async event => {
    event.preventDefault();
    const user = {
      username,
      email,
      password
    };

    try {
      submit(user)
    } catch (error) {
      console.log("Something went wrong.");
    }

    setForm({...formData, "":""})
  };

  return (
    <Fragment>
      <Form
        // className="signup-form"
        onSubmit={e => {
          onSubmit(e);
        }}
      >
        <h3>Create a new account</h3>
        <Form.Group className="username-group">
          <Form.Control
            placeholder="Username"
            type="username"
            name="username"
            value={username}
            autoComplete="off"
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="email-group">
          <Form.Control
            placeholder="email"
            type="email"
            name="email"
            value={email}
            autoComplete="email"
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="password-group">
          <Form.Control
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            autoComplete="password"
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Button className="signup-btn" type="submit">Sign Up</Button>
      </Form>
    </Fragment>
  );
};

export default Signup;