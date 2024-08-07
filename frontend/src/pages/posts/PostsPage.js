import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefault";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useCurrentSearch } from "../../context/SearchContext";
import InfiniteScroll from "react-infinite-scroll-component";
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
import { useDebounce } from "../../hooks/useDebounce";

const fetchPosts = async ({ pageParam = 1, queryKey }) => {
  const [_, filter, searchQuery, latitude, longitude, radius] = queryKey;
  let queryBase = `/posts/?${filter}search=${searchQuery}`;
  let locationQuery =
    latitude && longitude && radius !== 200000
      ? `&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
      : "";

  let query = `${queryBase}${locationQuery}&page=${pageParam}`;
  const { data } = await axiosReq.get(query);
  return data;
};

const PostsPage = ({ message = "No results found", filter = "" }) => {
  const noResultsSrc =
    "https://res.cloudinary.com/drffvkjy6/image/upload/v1708332982/search_no_results_pujyrg.webp";
  const { pathname } = useLocation();
  const isFeedPage = pathname === "/feed";
  const currentUser = useCurrentUser();
  const searchQuery = useCurrentSearch();
  const [latitude, setLatitude] = useState(currentUser?.profile_location_data?.latitude || 0);
  const [longitude, setLongitude] = useState(currentUser?.profile_location_data?.longitude || 0);
  const radius = useRadius();
  const setRadius = useSetRadius();
  const [mapZoom, setMapZoom] = useState(5);
  const [mapCenter, setMapCenter] = useState([53, 14]);
  const { recommendedProfiles } = useProfileData();

  const debouncedRadius = useDebounce(radius, 500);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", filter, searchQuery, latitude, longitude, debouncedRadius],
    queryFn: fetchPosts,
    enabled: !currentUser || (!!latitude && !!longitude),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    setLatitude(currentUser?.profile_location_data?.latitude || 0);
    setLongitude(currentUser?.profile_location_data?.longitude || 0);
  }, [currentUser]);

  useEffect(() => {
    const defaultMapCenter = [53, 14];
    const newMapCenter =
      latitude && longitude
        ? [latitude, longitude]
        : data?.pages?.[0]?.results?.length > 0
        ? [
            data.pages[0].results[0].location_data.latitude,
            data.pages[0].results[0].location_data.longitude,
          ]
        : defaultMapCenter;

    setMapCenter(newMapCenter);
    if (!latitude || !longitude) {
      setMapZoom(3);
    } else {
      setMapZoom(calculateMapZoom(debouncedRadius));
    }
  }, [latitude, longitude, data?.pages, debouncedRadius]);

  const handleFetchMoreData = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  return (
    <Row>
      <Col>
        {(latitude !== 0 && longitude !== 0) ? (
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

        {isLoading ? (
          <Asset spinner />
        ) : error ? (
          <div>Error loading posts</div>
        ) : (
          <>
            {data?.pages?.[0]?.results?.length ? (
              <>
                <Row className="d-md-none">
                  <Col>
                    <RecommendedProfiles radius={radius} />
                  </Col>
                </Row>
                {latitude !== 0 && longitude !== 0 && (
                  <Row className="mt-4">
                    <Col>
                      <h2>
                        {debouncedRadius === 200000
                          ? `All posts ${
                              isFeedPage ? "from the users you follow" : ""
                            }`
                          : `Posts ${
                              isFeedPage ? "from the users you follow" : ""
                            } ${debouncedRadius < 1000 ? debouncedRadius : debouncedRadius / 1000} ${
                              debouncedRadius < 1000 ? "meters" : "km"
                            } from your location`}
                      </h2>
                    </Col>
                  </Row>
                )}
                <Row className="mt-4">
                  <Col md={7}>
                    <InfiniteScroll
                      dataLength={data.pages.reduce((acc, page) => acc + page.results.length, 0)}
                      next={handleFetchMoreData}
                      hasMore={!!hasNextPage}
                      loader={<Asset spinner />}
                      className={appStyles.InfiniteScroll}
                    >
                      {data.pages.map((page) =>
                        page.results.map((post) => (
                          <PostListView
                            key={post.id}
                            {...post}
                            currentUser={currentUser}
                          />
                        ))
                      )}
                    </InfiniteScroll>
                  </Col>
                  <Col md={5} className="d-none d-md-block px-4">
                    <Row className="mb-3">
                      <Col>
                        <RecommendedProfiles radius={debouncedRadius} />
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
                            {data.pages.map((page) =>
                              page.results.map((post) => (
                                <Marker
                                  key={post.id}
                                  position={[
                                    post.location_data?.latitude,
                                    post.location_data?.longitude,
                                  ]}
                                >
                                  <Popup>{post.title}</Popup>
                                </Marker>
                              ))
                            )}
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
        )}
      </Col>
    </Row>
  );
};

export default PostsPage;
