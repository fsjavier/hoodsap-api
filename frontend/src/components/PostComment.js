import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import styles from "../styles/Comment.module.css";
import { useCurrentUser } from "../context/CurrentUserContext";
import { MoreDropdown } from "./MoreDropDown";
import ConfirmationModal from "./ConfirmationModal";
import { axiosRes } from "../api/axiosDefault";
import CommentEditForm from "../pages/comments/CommentEditForm";

const PostComment = ({
  profile_image,
  profile_id,
  owner,
  content,
  updated_at_naturaltime,
  id,
  setPost,
  setComments,
}) => {
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/post_comments/${id}`);

      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col xs={11} md={7}>
          <Link to={`/profile/${profile_id}`}>
            <span>
              <Avatar src={profile_image} height={24} />
            </span>
            <span className={styles.Owner}>{owner}</span>
          </Link>
          <span>·</span>
          <span className={`${styles.CommentTime} text-muted`}>{updated_at_naturaltime}</span>
        </Col>
        {is_owner && !showEditForm && (
          <Col xs={1}>
            <MoreDropdown
              handleEdit={() => setShowEditForm(true)}
              handleShowDeleteModal={() => setShowDeleteModal(true)}
            />
          </Col>
        )}
      </Row>
      {showEditForm ? (
        <CommentEditForm
          id={id}
          content={content}
          setComments={setComments}
          setShowEditForm={setShowEditForm}
          endpoint="post_comments"
        />
      ) : (
        <Row>
          <Col className={styles.Content}>{content}</Col>
        </Row>
      )}

      <ConfirmationModal
        showModal={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Delete comment"
        body="Are you sure you want to delete the comment. This action can't be undone."
        button="Delete"
        handleAction={handleDelete}
      />
    </Container>
  );
};

export default PostComment;
