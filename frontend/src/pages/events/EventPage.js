import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import Event from "../../components/Event";
// import CommentPostCreateForm from "../comments/CommentPostCreateForm";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Comment from "../../components/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import appStyles from "../../App.module.css";

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });
  const [hasLoadedEvent, setHasLoadedEvent] = useState(false);
  const currentUser = useCurrentUser();
  const [comments, setComments] = useState({ results: [] });
  const [hasLoadedComments, setHasLoadedComments] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const [{ data: event }, { data: comments }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
          axiosReq.get(`/event_comments/?event=${id}`),
        ]);
        setEvent({ results: [event] });
        setComments(comments);
        setHasLoadedEvent(true);
        setHasLoadedComments(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoadedEvent(false);
    setHasLoadedComments(false);
    fetchEventData();
  }, [id]);

  return (
    <Container className="h-100 mt-4">
      <Row>
        <Col>
          {hasLoadedEvent ? (
            <Event {...event.results[0]} setEvents={setEvent} eventPage />
          ) : (
            <Asset spinner />
          )}
        </Col>
      </Row>
      {currentUser && hasLoadedEvent ? (
        <Row>
          <Col>
            {/* <CommentEventCreateForm
              profile_id={currentUser?.profile_id}
              profile_image={currentUser?.profile_image}
              event={id}
              setEvent={setEvent}
              setComments={setComments}
            /> */}
          </Col>
        </Row>
      ) : comments.results.length ? (
        "Comments"
      ) : null}
      {hasLoadedComments ? (
        comments.results.length ? (
          <InfiniteScroll
            children={comments.results.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                setEvent={setEvent}
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
          <div className="text-center my-3">No comments yet, be the first!</div>
        ) : (
          <div className="text-center my-3">No comments yet.</div>
        )
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default EventPage;
