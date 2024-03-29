import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useCurrentSearch } from "../../context/SearchContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import appStyles from "../../App.module.css";
import "rc-slider/assets/index.css";
import styles from "../../styles/PostsPage.module.css";
import "../../styles/Slider.css";
import RecommendedProfiles from "../../components/RecommendedProfiles";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import PostListView from "../../components/PostListView";
import { Alert, Form } from "react-bootstrap";
import Slider from "rc-slider";
import { useRadius, useSetRadius } from "../../context/RadiusFilterContext";
import { calculateRadiusStep, calculateMapZoom } from "../../utils/utils";
import { useProfileData } from "../../context/ProfileDataContext";

const PostsPage = ({ message = "No results found", filter = "" }) => {
  const noResultsSrc =
    "https://res.cloudinary.com/drffvkjy6/image/upload/v1708332982/search_no_results_pujyrg.webp";
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const isFeedPage = pathname === "/feed";
  const currentUser = useCurrentUser();
  const searchQuery = useCurrentSearch();
  const [latitude, setLatitude] = useState(
    currentUser?.profile_location_data?.latitude
  );
  const [longitude, setLongitude] = useState(
    currentUser?.profile_location_data?.longitude
  );
  const radius = useRadius();
  const setRadius = useSetRadius();
  const [mapZoom, setMapZoom] = useState(5);
  const [mapCenter, setMapCenter] = useState([null]);
  const { recommendedProfiles } = useProfileData();

  useEffect(() => {
    setLatitude(currentUser?.profile_location_data?.latitude);
    setLongitude(currentUser?.profile_location_data?.longitude);

    const fetchPosts = async () => {
      try {
        let queryBase = `/posts/?${filter}search=${searchQuery}`;
        let locationQuery =
          latitude && longitude && radius !== 200000
            ? `&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
            : "";

        let query = `${queryBase}${locationQuery}`;
        const { data } = await axiosReq.get(query);

        setPosts(data);
        setHasLoaded(true);
      } catch (error) {}
    };

    setHasLoaded(false);

    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname, currentUser, searchQuery, latitude, longitude, radius]);

  useEffect(() => {
    const defaultMapCenter = [53, 14];
    const newMapCenter =
      latitude && longitude
        ? [latitude, longitude]
        : posts.results.length > 0
        ? [
            posts.results[0].location_data.latitude,
            posts.results[0].location_data.longitude,
          ]
        : defaultMapCenter;

    setMapCenter(newMapCenter);
    if (!latitude || !longitude) {
      setMapZoom(3);
    } else {
      setMapZoom(calculateMapZoom(radius));
    }
  }, [latitude, longitude, posts.results, radius]);

  useEffect(() => {
    if (isFeedPage) {
      const fetchPosts = async () => {
        try {
          let queryBase = `/posts/?${filter}search=${searchQuery}`;
          let locationQuery =
            latitude && longitude && radius !== 200000
              ? `&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
              : "";

          let query = `${queryBase}${locationQuery}`;
          const { data } = await axiosReq.get(query);

          setPosts(data);
          setHasLoaded(true);
        } catch (error) {}
      };

      setHasLoaded(false);
      const timer = setTimeout(() => {
        fetchPosts();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [recommendedProfiles]);

  return (
    <Row>
      <Col>
        {latitude && longitude ? (
          <Row>
            <Col>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group
                  controlId="formRadius"
                  className={styles.Slider__Container}
                >
                  <Form.Label>Slide to select distance</Form.Label>
                  <Slider
                    min={0}
                    max={200000}
                    step={calculateRadiusStep(radius)}
                    value={radius}
                    onChange={(value) => setRadius(value)}
                  />
                  <Form.Text className="text-muted">
                    {radius === 200000
                      ? "All posts"
                      : `${radius < 1000 ? radius : radius / 1000} ${
                          radius < 1000 ? "meters" : "km"
                        }`}
                  </Form.Text>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        ) : (
          currentUser && (
            <Row className="mt-2 text-center">
              <Col>
                <Alert variant="info">
                  Hoodsap is better with location! Don't forget to set your
                  location in your profile.
                </Alert>
              </Col>
            </Row>
          )
        )}

        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <>
                <Row className="d-md-none">
                  <Col>
                    <RecommendedProfiles radius={radius} />
                  </Col>
                </Row>
                {latitude && longitude && (
                  <Row className="mt-4">
                    <Col>
                      <h2>
                        {radius === 200000
                          ? `All posts ${
                              isFeedPage ? "from the users you follow" : ""
                            }`
                          : `Posts ${
                              isFeedPage ? "from the users you follow" : ""
                            } ${radius < 1000 ? radius : radius / 1000} ${
                              radius < 1000 ? "meters" : "km"
                            } from your location`}
                      </h2>
                    </Col>
                  </Row>
                )}
                <Row className="mt-4">
                  <Col md={7}>
                    <InfiniteScroll
                      children={posts.results.map((post) => (
                        <PostListView
                          key={post.id}
                          {...post}
                          setPosts={setPosts}
                          currentUser={currentUser}
                        />
                      ))}
                      dataLength={posts.results.length}
                      loader={<Asset spinner />}
                      hasMore={!!posts.next}
                      next={() => fetchMoreData(posts, setPosts)}
                      className={appStyles.InfiniteScroll}
                    />
                  </Col>
                  <Col md={5} className="d-none d-md-block px-4">
                    <Row className="mb-3">
                      <Col>
                        <RecommendedProfiles radius={radius} />
                      </Col>
                    </Row>
                    <Row className={`${styles.Sticky}`}>
                      <Col>
                        <div className={`${styles.Map__Container}`}>
                          <MapContainer
                            center={mapCenter}
                            zoom={mapZoom}
                            className={styles.Map}
                          >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {posts.results.map((post) => (
                              <Marker
                                key={post.id}
                                position={[
                                  post.location_data?.latitude,
                                  post.location_data?.longitude,
                                ]}
                              >
                                <Popup>{post.title}</Popup>
                              </Marker>
                            ))}
                          </MapContainer>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
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
  );
};

export default PostsPage;
