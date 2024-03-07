import React, { useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import { Link, useHistory } from "react-router-dom";
import Avatar from "./Avatar";
import { axiosReq } from "../api/axiosDefault";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MoreDropdown } from "./MoreDropDown";
import ConfirmationModal from "../components/ConfirmationModal";
import {
  ChatBubbleLeftIcon,
  MapPinIcon,
  TagIcon,
  CalendarIcon,
  BuildingLibraryIcon,
  SunIcon,
  UserPlusIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
import appStyles from "../App.module.css";
import styles from "../styles/Event.module.css";
import { capitalizeFirstLetter, formatLocation } from "../utils/utils";

const Event = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    profile_name,
    title,
    content,
    image,
    location_data,
    event_date,
    event_category,
    indoor_outdoor,
    event_registration,
    tags_data,
    comments_count,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { latitude, longitude } = location_data;
  const formattedLocation = formatLocation(location_data);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleEdit = () => {
    history.push(`/events/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/events/${id}`);
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row className="mt-3">
        <Col className="px-0">
          <Row className="py-3">
            <Col>
              <span onClick={() => history.goBack()} className={appStyles.Link}>
                <ArrowLeftCircleIcon className={appStyles.Icon} /> Go Back
              </span>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={7}>
              <Media className="justify-content-between align-items-center">
                <Link to={`/profile/${profile_id}`}>
                  <Avatar src={profile_image} height={50} />
                  {profile_name || owner}
                </Link>
                <div className="d-flex">
                  {is_owner && (
                    <MoreDropdown
                      handleEdit={handleEdit}
                      handleShowDeleteModal={() => setShowDeleteModal(true)}
                    />
                  )}
                </div>
              </Media>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={7}>
              <div className="my-2">
                <div>
                  <Link to={`/events/${id}`}>
                    {title && <h3 className="my-2">{title}</h3>}
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
                        <Image
                          src={image}
                          alt={title}
                          className={styles.Image}
                        />
                      </div>
                    )}
                  </Link>
                </div>
                <div className="my-3">
                  <h4>Description</h4>
                  {content && <div>{content}</div>}
                  <div className={styles.Comments}>
                    <span>
                      <Link to={`/events/${id}`} aria-label="link to comments" >
                        <ChatBubbleLeftIcon className={styles.Icon} />
                      </Link>
                      {comments_count}
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={5} className="d-flex flex-column">
              <div className={styles.EventSummary__Container}>
                <h4>Event details</h4>
                {eventSummary}
              </div>

              <div className={styles.Map__Container}>
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={15}
                  className={styles.Map}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[latitude, longitude]}>
                    <Popup>{title}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <ConfirmationModal
        showModal={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Delete event"
        button="Delete"
        body="Are you sure you want to delete the event. This action can't be undone."
        handleAction={handleDelete}
      />
    </>
  );
};

export default Event;
