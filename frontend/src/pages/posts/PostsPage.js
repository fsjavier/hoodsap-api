import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefault";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Post from "../../components/Post";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../context/CurrentUserContext";

const PostsPage = ({ message = "No results found", filter = "" }) => {
  const noResultsSrc =
    "https://res.cloudinary.com/drffvkjy6/image/upload/v1708332982/search_no_results_pujyrg.webp";
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosRes.get(`/posts/?${filter}`);
        const data = response.data;
        console.log(data);
        setPosts(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoaded(false);
    fetchPosts();
  }, [filter, pathname, currentUser]);

  return (
    <Container>
      <Row>
        <Col>
          {hasLoaded ? (
            <>
              {posts.results.length > 0 ? (
                posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))
              ) : (
                <Asset
                  src={noResultsSrc}
                  message={message}
                  height={250}
                  width={250}
                />
              )}
            </>
          ) : (
            <Asset spinner />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PostsPage;
