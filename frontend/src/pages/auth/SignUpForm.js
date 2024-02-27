import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import CustomButton from "../../components/CustomButton";
import AppStyles from "../../App.module.css";
import styles from "../../styles/SignInUpForm.module.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn")
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { username, password1, password2 } = signUpData;
  const isEnabled = username && password1 && password2;

  function handleChange(event) {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Container>
      <Row className={`${styles.Row} ${styles.Background}`}>
        <Col className="my-auto mx-auto" md={6} xl={4}>
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
              {errors.username?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
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
              {errors.password1?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
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
              {errors.password2?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <p className="small">
                Do you already have an acount?{" "}
                <Link to="/signin" className={AppStyles.Link}>
                  Sign in
                </Link>
              </p>

              <CustomButton
                variant="Primary"
                type="submit"
                disabled={!isEnabled}
                className="mx-auto"
              >
                Sign Up Now
              </CustomButton>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpForm;
