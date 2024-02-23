import React, { useRef, useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import styles from "../styles/Profile.module.css";
import { Overlay, OverlayTrigger, Popover } from "react-bootstrap";
import CustomButton from "./CustomButton";

const Profile = ({ profile }) => {
  const { id, following_id, avatar, owner } = profile;
  console.log(profile);

  const [showPopover, setShowPopover] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleClick = (event) => {
    setTarget(event.currentTarget);
    setShowPopover(!showPopover);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content className={styles.Popover__Container}>
        <Link to={`/profiles/${id}`} >
          <Avatar src={avatar} height={54}/>
          <span className={styles.User}>{owner}</span>
        </Link>
        <div className={styles.Button__Container}>
          <CustomButton onClick={() => {}}>Follow</CustomButton>
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <div ref={ref}>
      <div className={`${styles.Profile__Container}`} onClick={handleClick}>
        <Avatar src={avatar} height={24} />
        <div className={`${styles.Truncate}`}>{owner}</div>
      </div>
      <Overlay
        show={showPopover}
        placement="bottom"
        target={target}
        container={ref.current}
        rootClose
        onHide={() => setShowPopover(false)}
        style={{ cursor: "default" }}
      >
        {popover}
      </Overlay>
    </div>
  );
};

export default Profile;
