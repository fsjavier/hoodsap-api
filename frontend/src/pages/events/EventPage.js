import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import Event from "../../components/Event";
import CommentEventCreateForm from "../comments/CommentEventCreateForm";
import { useCurrentUser } from "../../context/CurrentUserContext";
import EventComment from "../../components/EventComment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import appStyles from "../../App.module.css";

const EventPage = () => {
  const { id } = useParams();
  const [socialEvent, setSocialEvent] = useState({ results: [] });
  const [hasLoadedEvent, setHasLoadedEvent] = useState(false);
  const currentUser = useCurrentUser();
  const [comments, setComments] = useState({ results: [] });
  const [hasLoadedComments, setHasLoadedComments] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const [{ data: socialEvent }, { data: comments }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
          axiosReq.get(`/event_comments/?social_event=${id}`),
        ]);
        setSocialEvent({ results: [socialEvent] });
        setComments(comments);
        setHasLoadedEvent(true);
        setHasLoadedComments(true);
      } catch (error) {}
    };

    setHasLoadedEvent(false);
    setHasLoadedComments(false);
    fetchEventData();
  }, [id]);

  return (
    <Row>
      <Col>
        {hasLoadedEvent && hasLoadedComments ? (
          <>
            <Row>
              <Col>
                <Event
                  {...socialEvent.results[0]}
                  setSocialEvents={setSocialEvent}
                />
              </Col>
            </Row>
            {currentUser && hasLoadedEvent ? (
              <Row>
                <Col>
                  <CommentEventCreateForm
                    profile_id={currentUser?.profile_id}
                    profile_image={currentUser?.profile_image}
                    socialEvent={id}
                    setSocialEvent={setSocialEvent}
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
                  <EventComment
                    key={comment.id}
                    {...comment}
                    setSocialEvent={setSocialEvent}
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
              <div className="text-center my-3">
                No comments yet, be the first!
              </div>
            ) : (
              <div className="text-center my-3">No comments yet.</div>
            )}
          </>
        ) : (
          <Asset spinner />
        )}
      </Col>
    </Row>
  );
};

export default EventPage;
