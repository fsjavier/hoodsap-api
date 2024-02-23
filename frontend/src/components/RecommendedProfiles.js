import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCurrentUser } from "../context/CurrentUserContext";
import { axiosReq } from "../api/axiosDefault";
import Asset from "./Asset";
import styles from "../styles/RecommendedProfiles.module.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Profile from "./Profile";

const RecommendedProfiles = () => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    recommendedProfiles: { results: [] },
  });

  const { recommendedProfiles } = profileData;
  const currentUser = useCurrentUser();

  const scrollRef = useRef();

  const scroll = (scrollOffset) => {
    scrollRef.current.scroll({
      left: scrollOffset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        console.log(data);
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          recommendedProfiles: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfiles();
  }, [currentUser]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={7} className="mt-2">
          <p>Recommended profiles</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={7} className="d-flex align-items-center">
          <div>
            <ChevronLeftIcon
              className={styles.Chevron}
              onClick={() => scroll(-100)}
            />
          </div>
          <div
            className={styles.RecommendedProfiles__Container}
            ref={scrollRef}
          >
            {recommendedProfiles.results.length ? (
              recommendedProfiles.results.map((profile) => (
                <Profile key={profile.id} profile={profile} />
              ))
            ) : (
              <Asset spinner />
            )}
          </div>
          <div>
            <ChevronRightIcon
              className={styles.Chevron}
              onClick={() => scroll(100)}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RecommendedProfiles;
