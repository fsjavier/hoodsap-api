import Container from "react-bootstrap/Container";
import AppStyles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";

function App() {
  return (
    <div className={AppStyles.App}>
      <NavBar />
      <Container className={AppStyles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
