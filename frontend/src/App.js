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
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import EventPage from "./pages/events/EventPage";
import EventsPage from "./pages/events/EventsPage";
import EventEditForm from "./pages/events/EventEditForm";
import AddProfileLocation from "./components/AddProfileLocation";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  const [isProfileLocationSet, setIsProfileLocationSet] = useState();

  useEffect(() => {
    if (currentUser) {
      if (
        !currentUser.profile_location_data?.latitude ||
        !currentUser.profile_location_data?.longitude
      ) {
        setIsProfileLocationSet(false);
      } else {
        setIsProfileLocationSet(true);
      }
    }
  }, [currentUser]);

  return (
    <div className={AppStyles.App}>
      <NavBar />
      <Container className={AppStyles.Main}>
        <Switch>
          <Route exact path="/">
            {currentUser && !isProfileLocationSet ? (
              <Redirect to="/add-location" />
            ) : (
              <PostsPage />
            )}
          </Route>
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profile/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profile/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route exact path="/events">
            {currentUser && !isProfileLocationSet ? (
              <Redirect to="/add-location" />
            ) : (
              <EventsPage />
            )}
          </Route>
          <Route
            exact
            path="/events/create"
            render={() => <EventCreateForm />}
          />
          <Route exact path="/events/:id" render={() => <EventPage />} />
          <Route
            exact
            path="/events/:id/edit"
            render={() => <EventEditForm />}
          />
          <Route
            exact
            path="/add-location"
            render={() => <AddProfileLocation />}
          />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
