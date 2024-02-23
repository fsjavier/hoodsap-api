import React from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import styles from "../styles/Profile.module.css"

const Profile = ({ profile }) => {
  const { id, following_id, avatar, owner } = profile;
  console.log(profile);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
      <Link className={`${styles.Profile__Container}`}>
        <div>
          <Avatar src={avatar} height={24} />
        </div>
        <div className={`${styles.Truncate}`}>{owner}</div>
      </Link>
  );
};

export default Profile;
