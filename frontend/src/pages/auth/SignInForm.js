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
import { useSetCurrentUser } from "../../context/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { username, password } = signInData;
  const isEnabled = username && password;

  function handleChange(event) {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Container>
      <Row className={`${styles.Row} ${styles.Background}`}>
        <Col className="my-auto mx-auto" md={6} xl={4}>
          <Container className={`${styles.FormContainer}`}>
            <h2>Sign In</h2>
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
              <Form.Group controlId="password">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  className="mt-3"
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <p className="small">
                Don't have an acount?{" "}
                <Link to="/signup" className={AppStyles.Link}>
                  Sign up
                </Link>
              </p>

              <CustomButton
                variant="Primary"
                type="submit"
                disabled={!isEnabled}
                className="mx-auto"
              >
                Sign In
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
};

export default SignInForm;
