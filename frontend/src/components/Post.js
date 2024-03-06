import React, { useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import { Link, useHistory } from "react-router-dom";
import Avatar from "./Avatar";
import { axiosReq } from "../api/axiosDefault";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import styles from "../styles/Post.module.css";
import { MoreDropdown } from "./MoreDropDown";
import ConfirmationModal from "../components/ConfirmationModal";
import PostLikesAndComments from "./PostLikesAndComments";
import { formatLocation } from "../utils/utils";

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
    location_data,
    tags_data,
    like_id,
    likes_count,
    comments_count,
    updated_at,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { latitude, longitude } = location_data;
  const formattedLocation = formatLocation(location_data)
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

  return (
    <>
      <Row>
        <Col className="px-0">
          <Row>
            <Col xs={12} md={7}>
              <Media className="justify-content-between align-items-center">
                <Link to={`/profile/${profile_id}`}>
                  <Avatar src={profile_image} height={50} />
                  {profile_name || owner}
                </Link>
                <div className="d-flex">
                  <span>{updated_at}</span>
                  {is_owner && (
                    <MoreDropdown
                      handleEdit={handleEdit}
                      handleShowDeleteModal={() => setShowDeleteModal(true)}
                    />
                  )}
                </div>
              </Media>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={7}>
              <div className="my-2">
                <div>
                  <Link to={`/posts/${id}`}>
                    {title && <h3 className="my-2">{title}</h3>}
                    {tags_data.length > 0 &&
                      tags_data.map((tag) => (
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
                        <Image
                          src={image}
                          alt={title}
                          className={styles.Image}
                        />
                      </div>
                    )}
                  </Link>
                </div>
                <div className="my-3">
                  {content && <Card.Text>{content}</Card.Text>}
                  <PostLikesAndComments
                    id={id}
                    like_id={like_id}
                    likes_count={likes_count}
                    comments_count={comments_count}
                    setPosts={setPosts}
                    currentUser={currentUser}
                    is_owner={is_owner}
                  />
                </div>
              </div>
            </Col>
            <Col md={5} className="d-flex flex-column">
              <div className="text-center mb-2">
                {formattedLocation}
              </div>
              <div className={styles.Map__Container}>
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={13}
                  className={styles.Map}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[latitude, longitude]} />
                </MapContainer>
              </div>
            </Col>
          </Row>
        </Col>
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
