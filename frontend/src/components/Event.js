import React, { useEffect, useState } from "react";
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
} from "@heroicons/react/24/outline";
import styles from "../styles/Event.module.css";
import { capitalizeFirstLetter } from "../utils/utils";

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
    location,
    event_date,
    event_category,
    indoor_outdoor,
    event_registration,
    tags,
    comments_count,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [locationPosition, setLocationPosition] = useState(null);
  const [locationLocality, setLocationLocality] = useState(null);
  const [tagsText, setTagsText] = useState(null);
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
        {locationLocality &&
          `${
            locationLocality?.city
          }, ${locationLocality?.country.toUpperCase()}`}
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location) {
          const response = await axiosReq.get(`/locations/${location}`);
          const locationDetails = response.data;
          setLocationPosition([
            locationDetails.latitude,
            locationDetails.longitude,
          ]);
          setLocationLocality({
            country: locationDetails.country,
            city: locationDetails.city,
          });
        }

        if (tags && tags.length > 0) {
          const fetchedTags = [];
          for (let tag of tags) {
            const response = await axiosReq.get(`/tags/${tag}`);
            const tagDetails = response.data.name;
            fetchedTags.push(tagDetails);
          }
          setTagsText(fetchedTags);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [location, tags]);

  return (
    <>
      <Row className="h-100 mx-0">
        <Col>
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
                    {tagsText &&
                      tagsText.map((tag, index) => (
                        <Badge
                          key={index}
                          pill
                          variant="secondary"
                          className="mr-2 mb-4"
                        >
                          {tag}
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
                      <Link to={`/events/${id}`}>
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
              {locationPosition && (
                <div className={styles.Map__Container}>
                  <MapContainer
                    center={locationPosition}
                    zoom={15}
                    className={styles.Map}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={locationPosition}>
                      <Popup>{title}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              )}
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
