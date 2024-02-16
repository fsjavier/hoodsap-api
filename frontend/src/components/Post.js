import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { axiosReq } from "../api/axiosDefault";
import { MapContainer, TileLayer, Circle } from "react-leaflet";

const Post = (props) => {
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
    tags,
    like_id,
    likes_count,
    comments_count,
    created_at,
    updated_at,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [locationPosition, setLocationPosition] = useState(null);
  const [locationLocality, setLocationLocality] = useState(null);
  const [tagsText, setTagsText] = useState(null);
  const fillRedOptions = { fillColor: "red" };

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
            "country": locationDetails.country,
            "city": locationDetails.city,
          })
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
      <Row>
        <Col xs={12} md={7}>
          <Card className="my-2">
            <Card.Body>
              <Media className="justify-content-between align-items-center">
                <Link to={`/profiles/${profile_id}`}>
                  <Avatar src={profile_image} height={50} />
                  {profile_name || owner}
                </Link>
                <div>
                  <span>{updated_at}</span>
                  {is_owner && postPage && " ..."}
                </div>
              </Media>
              <hr />
              {title && <Card.Title className="my-2">{title}</Card.Title>}
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
                <Link to={`/posts/${id}`}>
                  <Card.Img src={image} alt={title} />
                </Link>
              )}
            </Card.Body>
            {content && (
              <Card.Body>
                <Card.Text>{content}</Card.Text>
              </Card.Body>
            )}
          </Card>
        </Col>
        <Col md={5}>
          <Card className="my-2">
            <Card.Body>
              <Card.Text>{locationLocality && `${locationLocality?.city}, ${locationLocality?.country.toUpperCase()}`}</Card.Text>
              {postPage && locationPosition && (
                <MapContainer
                  center={locationPosition}
                  zoom={13}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Circle
                    center={locationPosition}
                    pathOptions={fillRedOptions}
                    radius={300}
                    stroke={false}
                  />
                </MapContainer>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </>
  );
};

export default Post;
