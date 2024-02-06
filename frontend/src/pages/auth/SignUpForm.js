import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomButton from "../../components/CustomButton";
import styles from "../../styles/SignInUpForm.module.css";

function SignUpForm() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const {username, password1, password2} = signUpData

  const isEnabled = username && password1 && password2

  function handleChange(event) {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
    console.dir(event.target);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Container>
      <Row className={styles.Row}>
        <Col className="my-auto mx-auto" lg={6}>
          <Container className={`${styles.FormContainer}`}>
            <h2>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleChange}
                  className="mt-3"
                />
              </Form.Group>
              <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password1"
                  placeholder="Password"
                  value={password1}
                  onChange={handleChange}
                  className="mt-3"
                />
              </Form.Group>
              <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  placeholder="Confirm password"
                  value={password2}
                  onChange={handleChange}
                  className="mt-3"
                />
              </Form.Group>

              <CustomButton variant="Primary" type="submit" disabled={!isEnabled} className="mx-auto">
                Sign Up Now
              </CustomButton>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpForm;
