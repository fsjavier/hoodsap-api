import React from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  HeartIcon as HeartIconOutline,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { axiosReq } from "../api/axiosDefault";
import styles from "../styles/PostLikesAndComments.module.css";

const PostLikesAndComments = ({
  id,
  like_id,
  currentUser,
  is_owner,
  comments_count,
  likes_count,
  setPosts,
}) => {

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
            <HeartIconSolid className={`${styles.Icon} ${styles.IconSolid}`} />
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
  );
};

export default PostLikesAndComments;
