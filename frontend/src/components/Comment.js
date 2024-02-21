import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import styles from "../styles/Comment.module.css";

const Comment = ({
  profile_image,
  profile_id,
  owner,
  content,
  updated_at_naturaltime,
  id,
  setPosts,
  setComments,
}) => {
  return (
    <Container className="my-4" fluid>
      <Row>
        <Col xs={12} md={7}>
          <Link to={`/profiles/${profile_id}`}>
            <span>
              <Avatar src={profile_image} height={24} />
            </span>
            <span className={styles.Owner}>{owner}</span>
          </Link>
          <span>·</span>
          <span className={styles.CommentTime}>{updated_at_naturaltime}</span>
        </Col>
      </Row>
      <Row>
        <Col className={styles.Content}>{content}</Col>
      </Row>
    </Container>
  );
};

export default Comment;
