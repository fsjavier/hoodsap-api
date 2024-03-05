import React, { useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Asset from "./Asset";
import styles from "../styles/RecommendedProfiles.module.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Profile from "./Profile";
import { useProfileData } from "../context/ProfileDataContext";
import { useCurrentUser } from "../context/CurrentUserContext";

const RecommendedProfiles = ({ radius }) => {
  const currentUser = useCurrentUser();
  const { recommendedProfiles } = useProfileData();

  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scroll({
      left: scrollOffset,
      behavior: "smooth",
    });
  };

  return (
    <>
      {recommendedProfiles?.results?.length >
        1 /* The user's profile will be returned but not displayed */ && (
        <>
          {currentUser && (
            <Row>
              <Col className="mt-2">
                <p className={styles.RecommendedProfiles}>
                  {" "}
                  {radius === 200000
                    ? "All profiles"
                    : `Profiles ${radius < 1000 ? radius : radius / 1000} ${
                        radius < 1000 ? "meters" : "km"
                      } from your location`}
                </p>
              </Col>
            </Row>
          )}

          <Row className="mt-2">
            <Col className="d-flex align-items-center justify-content-between">
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
                {recommendedProfiles.results?.length ? (
                  recommendedProfiles.results
                    .filter((profile) => profile.id !== currentUser?.profile_id)
                    .map((profile) => (
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
        </>
      )}
    </>
  );
};

export default RecommendedProfiles;
