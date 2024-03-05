import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import {
  ChatBubbleLeftIcon,
  MapPinIcon,
  TagIcon,
  CalendarIcon,
  BuildingLibraryIcon,
  SunIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import styles from "../styles/EventListView.module.css";
import { capitalizeFirstLetter } from "../utils/utils";
import { formatLocation } from "../utils/utils";

const EventListView = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    profile_name,
    title,
    image,
    location_data,
    event_date,
    event_category,
    indoor_outdoor,
    event_registration,
    tags_data,
    comments_count,
  } = props;

  const formattedLocation = formatLocation(location_data);

  const eventSummary = (
    <ul className="d-flex flex-column">
      <li>
        <CalendarIcon className={styles.Icon} />
        {event_date}
      </li>
      <li>
        <MapPinIcon className={styles.Icon} />
        {formattedLocation}
      </li>
      <li>
        <TagIcon className={styles.Icon} />
        {capitalizeFirstLetter(event_category)}
      </li>
      <li>
        {indoor_outdoor === "indoor" ? (
          <BuildingLibraryIcon className={styles.Icon} />
        ) : (
          <SunIcon className={styles.Icon} />
        )}

        {capitalizeFirstLetter(indoor_outdoor)}
      </li>
      {event_registration && (
        <li>
          <UserPlusIcon className={styles.Icon} />
          Registration required
        </li>
      )}
    </ul>
  );

  return (
    <>
      <Row className={styles.Event__Container}>
        <Col>
          <Row>
            <Col>
              <Media className="justify-content-between align-items-center">
                <Link to={`/profile/${profile_id}`}>
                  <Avatar src={profile_image} height={50} />
                  {profile_name || owner}
                </Link>
              </Media>
            </Col>
          </Row>

          <Row>
            <Col>
              <Link to={`/events/${id}`}>
                {title && <h3 className="my-2">{title}</h3>}
              </Link>
            </Col>
          </Row>

          <Row className="justify-content-center align-items-center">
            <Col md={7}>
              <Link to={`/events/${id}`}>
                {tags_data &&
                  tags_data.map((tag) => (
                    <Badge
                      key={tag.id}
                      pill
                      variant="secondary"
                      className="mr-2 mb-4"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                {image && (
                  <div className={styles.Image__Container}>
                    <Image src={image} alt={title} className={styles.Image} />
                  </div>
                )}
              </Link>
            </Col>

            <Col md={5} className="d-flex flex-column align-items-center py-2">
              <div>{eventSummary}</div>
            </Col>
          </Row>
          <Row>
            <Col className={styles.Comments}>
              <ChatBubbleLeftIcon className={styles.Icon} />
              {comments_count}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default EventListView;
