import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import styles from "../styles/PostListView.module.css";
import PostLikesAndComments from "./PostLikesAndComments";
import { formatLocation } from "../utils/utils";

const PostListView = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    profile_name,
    title,
    content,
    image,
    location_data,
    tags_data,
    like_id,
    likes_count,
    comments_count,
    updated_at,
    setPosts,
    currentUser,
  } = props;

  const formattedLocation = formatLocation(location_data)
  const is_owner = currentUser?.username === owner;

  return (
    <>
      <Row className={styles.Post__Container}>
        <Col>
          <Row className="pt-2">
            <Col className="d-flex">
              <Media className="justify-content-between align-items-center">
                <Link to={`/profile/${profile_id}`}>
                  <Avatar src={profile_image} height={50} />
                  {profile_name || owner}
                </Link>
              </Media>
              <div className="ml-auto align-self-end text-muted">{updated_at}</div>
            </Col>
          </Row>

          <Row>
            <Col className="d-flex">
              <Link to={`/posts/${id}`}>
                {title && <h3 className="my-2">{title}</h3>}
              </Link>
              <div className="ml-auto align-self-end text-muted">{formattedLocation}</div>
            </Col>
          </Row>

          <Row className="justify-content-center align-items-center">
            <Col>
              <Link to={`/posts/${id}`}>
                {tags_data &&
                  tags_data.map(tag => (
                    <Badge
                      key={tag.id}
                      pill
                      variant="secondary"
                      className="mr-2 mb-4"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                {image && (
                  <div className={styles.Image__Container}>
                    <Image src={image} alt={title} className={styles.Image} />
                  </div>
                )}
              </Link>
              <div className="mt-3">{content && content}</div>
            </Col>
          </Row>
          <Row className="pb-3">
            <Col className={styles.Comments}>
            <PostLikesAndComments
                    id={id}
                    like_id={like_id}
                    likes_count={likes_count}
                    comments_count={comments_count}
                    setPosts={setPosts}
                    currentUser={currentUser}
                    is_owner={is_owner}
                  />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default PostListView;
