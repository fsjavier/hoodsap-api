import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useCurrentSearch } from "../../context/SearchContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Asset from "../../components/Asset";
import EventListView from "../../components/EventListView";
import InfiniteScroll from "react-infinite-scroll-component";
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefault";
import { fetchMoreData } from "../../utils/utils";

const EventsPage = ({ message = "No results found", filter = "" }) => {
  const noResultsSrc =
    "https://res.cloudinary.com/drffvkjy6/image/upload/v1708332982/search_no_results_pujyrg.webp";
  const [socialEvents, setSocialEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const searchQuery = useCurrentSearch();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events/?${filter}search=${searchQuery}`
        );

        setSocialEvents(data);
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
  }, [filter, pathname, currentUser, searchQuery]);

  return (
    <>
      {hasLoaded ? (
        <Row>
          <Col>
            <Row>
              <Col>
                <h3 className="my-5">Filters</h3>
              </Col>
            </Row>
            <Row>
              <Col md={7}>
                {socialEvents.results.length ? (
                  <InfiniteScroll
                    children={socialEvents.results.map((socialEvent) => (
                      <EventListView key={socialEvent.id} {...socialEvent} />
                    ))}
                    dataLength={socialEvents.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!socialEvents.next}
                    next={() => fetchMoreData(socialEvents, setSocialEvents)}
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
              <Col>{/* map */}</Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Asset spinner />
      )}
    </>
  );
};

export default EventsPage;
