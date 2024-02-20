import React, { useEffect, useState } from "react";
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
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
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
  const [locationPosition, setLocationPosition] = useState(null);
  const [locationLocality, setLocationLocality] = useState(null);
  const [tagsText, setTagsText] = useState(null);
  const fillRedOptions = { fillColor: "red" };
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      axiosRes.delete(`/posts/${id}`);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location) {
          const response = await axiosReq.get(`/locations/${location}`);
          const locationDetails = response.data;
          setLocationPosition([
            locationDetails.latitude,
            locationDetails.longitude,
          ]);
          setLocationLocality({
            country: locationDetails.country,
            city: locationDetails.city,
          });
        }

        if (tags && tags.length > 0) {
          const fetchedTags = [];
          for (let tag of tags) {
            const response = await axiosRes.get(`/tags/${tag}`);
            const tagDetails = response.data.name;
            fetchedTags.push(tagDetails);
          }
          setTagsText(fetchedTags);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [location, tags]);

  return (
    <>
      <Row className="h-100 mx-0">
        <Col xs={12} md={7}>
          <Card className="my-2">
            <Card.Body>
              <Media className="justify-content-between align-items-center">
                <Link to={`/profiles/${profile_id}`}>
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
                {tagsText &&
                  tagsText.map((tag, index) => (
                    <Badge
                      key={index}
                      pill
                      variant="secondary"
                      className="mr-2 mb-4"
                    >
                      {tag}
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
        <Col md={5}>
          <Card className="my-2">
            <Card.Body>
              <Card.Text>
                {locationLocality &&
                  `${
                    locationLocality?.city
                  }, ${locationLocality?.country.toUpperCase()}`}
              </Card.Text>
              {locationPosition && (
                <MapContainer
                  center={locationPosition}
                  zoom={13}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Circle
                    center={locationPosition}
                    pathOptions={fillRedOptions}
                    radius={300}
                    stroke={false}
                  />
                </MapContainer>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
      <ConfirmationModal
        showModal={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Delete post"
        body="Are you sure you want to delete the post. This action can't be undone."
        handleAction={handleDelete}
      />
    </>
  );
};

export default Post;
