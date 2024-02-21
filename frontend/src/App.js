import Container from "react-bootstrap/Container";
import AppStyles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./context/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={AppStyles.App}>
        <NavBar />
        <Container className={AppStyles.Main}>
          <Switch>
            <Route exact path="/" render={() => <PostsPage />} />
            <Route
              exact
              path="/feed"
              render={() => (
                <PostsPage
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              )}
            />
            <Route exact path="/events" render={() => <h2>Events page</h2>} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route
              exact
              path="/posts/create"
              render={() => <PostCreateForm />}
            />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Container>
    </div>
  );
}

export default App;
