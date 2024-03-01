import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Post from "../../components/Post";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useCurrentSearch } from "../../context/SearchContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import RecommendedProfiles from "../../components/RecommendedProfiles";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const PostsPage = ({ message = "No results found", filter = "" }) => {
  const noResultsSrc =
    "https://res.cloudinary.com/drffvkjy6/image/upload/v1708332982/search_no_results_pujyrg.webp";
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const searchQuery = useCurrentSearch();
  const [postLocations, setPostLocations] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosReq.get(
          `/posts/?${filter}search=${searchQuery}`
        );
        const data = response.data;
        setPosts(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoaded(false);

    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname, currentUser, searchQuery]);

  return (
    <Container>
      {hasLoaded ? (
        <>
          <Row>
            <Col>
              <RecommendedProfiles />
            </Col>
          </Row>
          <Row>
            <Col md={7}>
              {posts.results.length ? (
                <InfiniteScroll
                  children={posts.results.map((post) => (
                    <Post
                      key={post.id}
                      {...post}
                      setPosts={setPosts}
                      setPostLocations={setPostLocations}
                    />
                  ))}
                  dataLength={posts.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!posts.next}
                  next={() => fetchMoreData(posts, setPosts)}
                  className={appStyles.InfiniteScroll}
                />
              ) : (
                <Asset
                  src={noResultsSrc}
                  message={message}
                  height={250}
                  width={250}
                />
              )}
            </Col>
            <Col className="d-none d-md-block">
              <div className={`${styles.Sticky} ${styles.Map__Container}`}>
                {postLocations.length > 0 && (
                  <MapContainer
                    center={[
                      postLocations[0].latitude,
                      postLocations[0].longitude,
                    ]}
                    zoom={13}
                    style={{ height: "350px", width: "100%" }}
                    className={styles.Map}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {postLocations.map(
                      (location, idx) =>
                        location.latitude &&
                        location.longitude && (
                          <Marker
                            key={idx}
                            position={[location.latitude, location.longitude]}
                          >
                            <Popup>{location.title}</Popup>
                          </Marker>
                        )
                    )}
                  </MapContainer>
                )}
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PostsPage;
