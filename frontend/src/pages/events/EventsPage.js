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
import styles from "../../styles/EventsPage.module.css";
import { axiosReq } from "../../api/axiosDefault";
import { fetchMoreData } from "../../utils/utils";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const EventsPage = ({ message = "No results found", filter = "" }) => {
  const noResultsSrc =
    "https://res.cloudinary.com/drffvkjy6/image/upload/v1708332982/search_no_results_pujyrg.webp";
  const [futureEvents, setFutureEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const searchQuery = useCurrentSearch();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [indoorOutdoorFilter, setIndoorOutdoorFilter] = useState("");
  const [eventLocations, setEventLocations] = useState([]);

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
    const fetchEvents = async () => {
      try {
        let query = `/events/?${filter}search=${searchQuery}`;
        if (categoryFilter) {
          query += `&event_category=${categoryFilter}`;
        }
        if (indoorOutdoorFilter) {
          query += `&indoor_outdoor=${indoorOutdoorFilter}`;
        }
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
  ]);

  return (
    <>
      {hasLoaded ? (
        <Row>
          <Col>
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
                      <Form.Label className="d-none">
                        Indoor/Outdoor:
                      </Form.Label>
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
            {futureEvents.results.length ? (
              <Row>
                <Col md={7}>
                  <InfiniteScroll
                    children={futureEvents.results.map((futureEvent) => (
                      <EventListView
                        key={futureEvent.id}
                        {...futureEvent}
                        setEventLocations={setEventLocations}
                      />
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
                    {eventLocations.length > 0 && (
                      <MapContainer
                        center={[
                          eventLocations[0].latitude,
                          eventLocations[0].longitude,
                        ]}
                        zoom={13}
                        style={{ height: "350px", width: "100%" }}
                        className={styles.Map}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {eventLocations.map((location, idx) => (
                          location.latitude && location.longitude ? (
                          <Marker
                            key={idx}
                            position={[location.latitude, location.longitude]}
                          >
                            <Popup>{location.title}</Popup>
                          </Marker>
                          ) : null
                        ))}
                      </MapContainer>
                    )}
                  </div>
                </Col>
              </Row>
            ) : (
              <Row>
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
          </Col>
        </Row>
      ) : (
        <Asset spinner />
      )}
    </>
  );
};

export default EventsPage;
