import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import Post from "../../components/Post";
import CommentPostCreateForm from "../comments/CommentPostCreateForm";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Comment from "../../components/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import appStyles from "../../App.module.css";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/post_comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostData();
  }, [id]);

  return (
    <Container className="h-100 mt-4">
      <Row>
        <Col>
          <Post {...post.results[0]} setPosts={setPost} postPage />
        </Col>
      </Row>
      {currentUser ? (
        <Row>
          <Col>
            <CommentPostCreateForm
              profile_id={currentUser?.profile_id}
              profile_image={currentUser?.profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          </Col>
        </Row>
      ) : comments.results.length ? (
        "Comments"
      ) : null}
      {comments.results.length ? (
        <InfiniteScroll
          children={comments.results.map((comment) => (
            <Comment
              key={comment.id}
              {...comment}
              setPost={setPost}
              setComments={setComments}
            />
          ))}
          dataLength={comments.results.length}
          loader={<Asset spinner />}
          hasMore={!!comments.next}
          next={() => fetchMoreData(comments, setComments)}
          className={appStyles.InfiniteScroll}
        />
      ) : currentUser ? (
        <span>No comments yet, be the first!</span>
      ) : (
        <span>No comments yet.</span>
      )}
    </Container>
  );
};

export default PostPage;
