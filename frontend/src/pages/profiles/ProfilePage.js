import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { useParams, Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import {
  useProfileData,
  useSetProfileData,
} from "../../context/ProfileDataContext";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfilePage.module.css";
import CustomButton from "../../components/CustomButton";
import { useCurrentUser } from "../../context/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData, formatLocation } from "../../utils/utils";
import { MapPinIcon } from "@heroicons/react/24/outline";
import PostListView from "../../components/PostListView";
import EventListView from "../../components/EventListView";

const ProfilePage = () => {
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const formatted_location = profile?.location_data
    ? formatLocation(profile.location_data)
    : "No location set";
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const [profileEvents, setProfileEvents] = useState({ results: [] });
  const [displayProfileContent, setDisplayProfileContent] = useState("Posts");
  const [hasLoaded, setHasLoaded] = useState(false);

  const fillRedOptions = { fillColor: "red" };

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile?.owner;

  const postsContent = (
    <>
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <PostListView
              key={post.id}
              {...post}
              setPosts={setProfilePosts}
              currentUser={currentUser}
            />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
          className="px-3 my-4"
        />
      ) : (
        <p className="my-4">{profile?.display_name} hasn't posted yet</p>
      )}
    </>
  );

  const eventsContent = (
    <>
      {profileEvents.results.length ? (
        <InfiniteScroll
          children={profileEvents.results.map((event) => (
            <EventListView
              key={event.id}
              {...event}
              setPosts={setProfileEvents}
            />
          ))}
          dataLength={profileEvents.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileEvents.next}
          next={() => fetchMoreData(profileEvents, setProfileEvents)}
          className="px-3 my-4"
        />
      ) : (
        <p className="my-4">
          {profile?.display_name} hasn't created events yet
        </p>
      )}
    </>
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [
          { data: pageProfile },
          { data: profilePosts },
          { data: profileEvents },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
          axiosReq.get(`/events/?owner__profile=${id}`),
        ]);

        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setProfileEvents(profileEvents);

        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoaded(false);
    fetchProfile();
  }, [id, setProfileData]);

  return (
    <Row className="mt-3">
      {hasLoaded ? (
        <>
          <Col xs={12} md={6} lg={5}>
            <div className="d-md-none">
              <h2>About {profile.display_name}</h2>
              <p>
                <MapPinIcon className={appStyles.Icon} />
                {formatted_location}
              </p>
              {profile.bio && profile.bio}
            </div>
            <div className={styles.ProfileAvatarLocation__Container}>
              <div className={styles.ProfileAvatar__Container}>
                <div className={styles.ProfileNameImage__Container}>
                  <Image src={profile.avatar} className={styles.ProfileImage} />
                  <h2 className={styles.ProfileName}>{profile.display_name}</h2>
                  {is_owner ? (
                    <div className={styles.EditFollow__Container}>
                      <Link to={`/profile/${id}/edit/`}>
                        <CustomButton>Edit Profile</CustomButton>
                      </Link>
                    </div>
                  ) : (
                    currentUser &&
                    !is_owner &&
                    (profile.following_id ? (
                      <div className={styles.EditFollow__Container}>
                        <CustomButton onClick={() => handleUnfollow(profile)}>
                          Unfollow
                        </CustomButton>
                      </div>
                    ) : (
                      <div className={styles.EditFollow__Container}>
                        <CustomButton onClick={() => handleFollow(profile)}>
                          Follow
                        </CustomButton>
                      </div>
                    ))
                  )}
                </div>
                <div>
                  <div className={styles.ProfileStats}>
                    <div>
                      <div>
                        <strong>{profile.followers_count}</strong>
                      </div>
                      <div>Followers</div>
                    </div>
                    <div>
                      <div>
                        <strong>{profile.following_count}</strong>
                      </div>
                      <div>Following</div>
                    </div>
                    <div>
                      <div>
                        <strong>{profile.posts_count}</strong>
                      </div>
                      <div>Posts</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.Map__Container}>
                {profile.location_data && (
                  <MapContainer
                    center={[
                      profile.location_data?.latitude,
                      profile.location_data?.longitude,
                    ]}
                    zoom={12}
                    className={styles.Map}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Circle
                      center={[
                        profile.location_data?.latitude,
                        profile.location_data?.longitude,
                      ]}
                      pathOptions={fillRedOptions}
                      radius={1200}
                      stroke={false}
                    />
                  </MapContainer>
                )}
              </div>
            </div>
          </Col>
          <Col md={6} lg={7}>
            <div className={styles.About__Container}>
              <div className="d-none d-md-block">
                <h2>About {profile.display_name}</h2>
                <p>
                  <MapPinIcon className={appStyles.Icon} />
                  {formatted_location}
                </p>
                {profile.bio && profile.bio}
              </div>
              <div className="my-5">
                <hr />
                <div className={styles.EventsPostsButtons}>
                  <CustomButton
                    variant="Light"
                    onClick={() => setDisplayProfileContent("Posts")}
                    selected={displayProfileContent === "Posts" && true}
                  >
                    Posts
                  </CustomButton>
                  <CustomButton
                    variant="Light"
                    onClick={() => setDisplayProfileContent("Events")}
                    selected={displayProfileContent === "Events" && true}
                  >
                    Events
                  </CustomButton>
                </div>
                {displayProfileContent === "Posts" && postsContent}
                {displayProfileContent === "Events" && eventsContent}
              </div>
            </div>
          </Col>
        </>
      ) : (
        <Col>
          <Asset spinner />
        </Col>
      )}
    </Row>
  );
};

export default ProfilePage;
