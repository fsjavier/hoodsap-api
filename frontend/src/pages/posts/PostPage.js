import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

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
    <Container className="h-100">
      <Row>
        <Col>
          <h2>Post</h2>
        </Col>
        <Col>
          <h2>Location</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Comments</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default PostPage;
