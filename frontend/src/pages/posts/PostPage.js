import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import Post from "../../components/Post";
import CommentPostCreateForm from "../comments/CommentPostCreateForm";
import { useCurrentUser } from "../../context/CurrentUserContext";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
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
    </Container>
  );
};

export default PostPage;
