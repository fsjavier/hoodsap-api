import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useCurrentSearch } from "../../context/SearchContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Asset from "../../components/Asset";
import EventListView from "../../components/EventListView";
import InfiniteScroll from "react-infinite-scroll-component";
import appStyles from "../../App.module.css";
import "rc-slider/assets/index.css";
import styles from "../../styles/EventsPage.module.css";
import "../../styles/Slider.css";
import { axiosReq } from "../../api/axiosDefault";
import {
  calculateMapZoom,
  calculateRadiusStep,
  fetchMoreData,
} from "../../utils/utils";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useRadius, useSetRadius } from "../../context/RadiusFilterContext";
import Slider from "rc-slider";

const EventsPage = ({ message = "No results found", filter = "" }) => {
  const noResultsSrc =
    "https://res.cloudinary.com/drffvkjy6/image/upload/v1708332982/search_no_results_pujyrg.webp";
  const [futureEvents, setFutureEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
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
  const [categoryFilter, setCategoryFilter] = useState("");
  const [indoorOutdoorFilter, setIndoorOutdoorFilter] = useState("");

  const filterSortFutureEvents = (socialEvents) => {
    const currentDate = new Date();
    const future = socialEvents.results
      ?.filter((event) => new Date(event.event_date) >= currentDate)
      .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
    setFutureEvents({
      ...socialEvents,
      results: future,
    });
  };

  useEffect(() => {
    setLatitude(currentUser?.profile_location_data?.latitude);
    setLongitude(currentUser?.profile_location_data?.longitude);

    const fetchEvents = async () => {
      try {
        let queryBase = `/events/?${filter}search=${searchQuery}`;
        let locationQuery =
          latitude && longitude && radius !== 200000
            ? `&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
            : "";
        let categoryFilterQuery =
          categoryFilter && `&event_category=${categoryFilter}`;

        let indoorOutdoorFilterQuery =
          indoorOutdoorFilter && `&indoor_outdoor=${indoorOutdoorFilter}`;

        let query = `${queryBase}${locationQuery}${categoryFilterQuery}${indoorOutdoorFilterQuery}`;
        const { data } = await axiosReq.get(query);

        filterSortFutureEvents(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoaded(false);

    const timer = setTimeout(() => {
      fetchEvents();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    filter,
    pathname,
    currentUser,
    searchQuery,
    categoryFilter,
    indoorOutdoorFilter,
    latitude,
    longitude,
    radius,
  ]);

  useEffect(() => {
    const newMapCenter =
      latitude && longitude
        ? [latitude, longitude]
        : futureEvents.results.length > 0
        ? [
            futureEvents.results[0].location_data.latitude,
            futureEvents.results[0].location_data.longitude,
          ]
        : null;

    setMapCenter(newMapCenter);
    if (!latitude || !longitude) {
      setMapZoom(4);
    } else {
      setMapZoom(calculateMapZoom(radius));
    }
  }, [latitude, longitude, futureEvents.results, radius]);

  return (
    <Row>
      <Col>
        {latitude && longitude && (
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
                      ? "All events"
                      : `${radius < 1000 ? radius : radius / 1000} ${
                          radius < 1000 ? "meters" : "km"
                        }`}
                  </Form.Text>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        )}

        <Row>
          <Col>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="d-none">Category:</Form.Label>
                  <Form.Control
                    as="select"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">Any category</option>
                    <option value="games">Games</option>
                    <option value="movies">Movies</option>
                    <option value="street_art">Street Art</option>
                    <option value="sport">Sport</option>
                    <option value="languages">Languages</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label className="d-none">Indoor/Outdoor:</Form.Label>
                  <Form.Control
                    as="select"
                    value={indoorOutdoorFilter}
                    onChange={(e) => {
                      setIndoorOutdoorFilter(e.target.value);
                    }}
                  >
                    <option value="">Indoor/Outdoor</option>
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </Col>
        </Row>

        {hasLoaded ? (
          <>
            {futureEvents.results?.length ? (
              <Row className="my-4">
                <Col md={7}>
                  <InfiniteScroll
                    children={futureEvents.results.map((futureEvent) => (
                      <EventListView key={futureEvent.id} {...futureEvent} />
                    ))}
                    dataLength={futureEvents.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!futureEvents.next}
                    next={() => fetchMoreData(futureEvents, setFutureEvents)}
                    className={appStyles.InfiniteScroll}
                  />
                </Col>
                <Col className="d-none d-md-block">
                  <div className={`${styles.Sticky} ${styles.Map__Container}`}>
                    <MapContainer
                      center={mapCenter}
                      zoom={mapZoom}
                      className={styles.Map}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {futureEvents.results.map((event) => (
                        <Marker
                          key={event.id}
                          position={[
                            event.location_data.latitude,
                            event.location_data.longitude,
                          ]}
                        >
                          <Popup>{event.title}</Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row className="my-4">
                <Col>
                  <Asset
                    src={noResultsSrc}
                    message={message}
                    height={250}
                    width={250}
                  />
                </Col>
              </Row>
            )}
          </>
        ) : (
          <Row className="my-4">
            <Col>
              <Asset spinner />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default EventsPage;
