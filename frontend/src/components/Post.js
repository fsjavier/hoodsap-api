import React, { useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom";
import Avatar from "./Avatar";
import { axiosReq } from "../api/axiosDefault";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import styles from "../styles/Post.module.css";
import {
  HeartIcon as HeartIconOutline,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { MoreDropdown } from "./MoreDropDown";
import ConfirmationModal from "../components/ConfirmationModal";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    profile_name,
    title,
    content,
    image,
    location,
    tags,
    like_id,
    likes_count,
    comments_count,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const {latitude, longitude, city, country} = location
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/posts/${id}`);
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axiosReq.post(`/likes/`, { post: id });
      const data = response.data;
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosReq.delete(`/likes/${like_id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row className="h-100 mx-0">
        <Col xs={12} md={postPage && 7}>
          <Card className="my-2">
            <Card.Body>
              <Media className="justify-content-between align-items-center">
                <Link to={`/profile/${profile_id}`}>
                  <Avatar src={profile_image} height={50} />
                  {profile_name || owner}
                </Link>
                <div className="d-flex">
                  <span>{updated_at}</span>
                  {is_owner && postPage && (
                    <MoreDropdown
                      handleEdit={handleEdit}
                      handleShowDeleteModal={() => setShowDeleteModal(true)}
                    />
                  )}
                </div>
              </Media>
              <hr />
              <Link to={`/posts/${id}`}>
                {title && <Card.Title className="my-2">{title}</Card.Title>}
                {tags.length > 0 &&
                  tags.map(tag => (
                    <Badge
                      key={tag.id}
                      pill
                      variant="secondary"
                      className="mr-2 mb-4"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                {image && <Card.Img src={image} alt={title} />}
              </Link>
            </Card.Body>
            <Card.Body>
              {content && <Card.Text>{content}</Card.Text>}
              <div className={styles.LikesComments}>
                <span>
                  {is_owner ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>You can't like your own post!</Tooltip>}
                    >
                      <HeartIconOutline className={styles.Icon} />
                    </OverlayTrigger>
                  ) : like_id ? (
                    <span onClick={handleUnlike}>
                      <HeartIconSolid
                        className={`${styles.Icon} ${styles.IconSolid}`}
                      />
                    </span>
                  ) : currentUser ? (
                    <span onClick={handleLike}>
                      <HeartIconOutline className={styles.Icon} />
                    </span>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Log in to like a post!</Tooltip>}
                    >
                      <HeartIconOutline className={styles.Icon} />
                    </OverlayTrigger>
                  )}
                  {likes_count}
                </span>
                <span>
                  <Link to={`/posts/${id}`}>
                    <ChatBubbleLeftIcon className={styles.Icon} />
                  </Link>
                  {comments_count}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {postPage && (
          <Col md={5}>
            <Card className="my-2">
              <Card.Body>
                <Card.Text>
                  {city && city}, {country.toUpperCase()}
                </Card.Text>

                  <MapContainer
                    center={[latitude, longitude]}
                    zoom={13}
                    style={{ height: "300px", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[latitude, longitude]}/>
                  </MapContainer>

              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      <Row>
        <Col></Col>
      </Row>
      <ConfirmationModal
        showModal={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Delete post"
        button="Delete"
        body="Are you sure you want to delete the post. This action can't be undone."
        handleAction={handleDelete}
      />
    </>
  );
};

export default Post;
