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
import { fetchMoreData } from "../../utils/utils";
import Post from "../../components/Post";
import { MapPinIcon } from "@heroicons/react/24/outline";

const ProfilePage = () => {
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  const [locationPosition, setLocationPosition] = useState();
  const [locationLocality, setLocationLocality] = useState();
  const fillRedOptions = { fillColor: "red" };

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);

        const { data: locationDetails } = await axiosReq.get(
          `/locations/${pageProfile.location}`
        );

        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          pageProfile: { results: [pageProfile] },
        }));

        setProfilePosts(profilePosts);

        setLocationPosition([
          locationDetails.latitude,
          locationDetails.longitude,
        ]);

        setLocationLocality({
          country: locationDetails.country,
          city: locationDetails.city,
        });

        console.log(pageProfile);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setLocationPosition(null);
    setHasLoaded(false);
    fetchProfile();
  }, [id, setProfileData]);

  return (
    <Row className="mt-3">
      {hasLoaded ? (
        <>
          <Col xs={12} md={6} lg={5}>
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
                {locationPosition && (
                  <MapContainer
                    center={locationPosition}
                    zoom={12}
                    style={{ height: "200px", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Circle
                      center={locationPosition}
                      pathOptions={fillRedOptions}
                      radius={1200}
                      stroke={false}
                    />
                  </MapContainer>
                )}
              </div>
            </div>
          </Col>
          <Col>
            <div className={styles.About__Container}>
              <h2>About {profile.display_name}</h2>
              <p>
                <MapPinIcon className={appStyles.Icon} />
                Based in{" "}
                {locationLocality &&
                  `${
                    locationLocality?.city
                  }, ${locationLocality?.country.toUpperCase()}`}
              </p>
              {profile.bio && profile.bio}
              <div className="my-5">
                <hr />
                <h3>Posts</h3>
                {profilePosts.results.length ? (
                  <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                      <Post
                        key={post.id}
                        {...post}
                        setPosts={setProfilePosts}
                      />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                  />
                ) : (
                  <p>{profile.display_name} hasn't posted yet</p>
                )}
              </div>
            </div>
          </Col>
        </>
      ) : (
        <Asset spinner />
      )}
    </Row>
  );
};

export default ProfilePage;
