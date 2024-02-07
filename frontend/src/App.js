import Container from "react-bootstrap/Container";
import AppStyles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState({});

  const getUser = async () => {
    try {
      const data = await axios.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (error) {
      setErrors(error);
      console.log(errors);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={AppStyles.App}>
          <NavBar />
          <Container className={AppStyles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
