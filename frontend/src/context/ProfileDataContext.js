import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq } from "../api/axiosDefault";
import { followHelper, unfollowHelper } from "../utils/utils";
import { useRadius } from "./RadiusFilterContext";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    recommendedProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();
  const [latitude, setLatitude] = useState(
    currentUser?.profile_location_data?.latitude
  );
  const [longitude, setLongitude] = useState(
    currentUser?.profile_location_data?.longitude
  );
  const radius = useRadius();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosReq.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevProfileData) => ({
        ...prevProfileData,

        pageProfile: {
          results: prevProfileData.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },

        recommendedProfiles: {
          ...prevProfileData.recommendedProfiles,
          results: prevProfileData.recommendedProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosReq.delete(`/followers/${clickedProfile.following_id}/`);

      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        pageProfile: {
          results: prevProfileData.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        recommendedProfiles: {
          ...prevProfileData.recommendedProfiles,
          results: prevProfileData.recommendedProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLatitude(currentUser?.profile_location_data?.latitude);
    setLongitude(currentUser?.profile_location_data?.longitude);

    const fetchProfiles = async () => {
      try {
        let queryBase = "/profiles/";
        let location_query =
          latitude && longitude && radius !== 200000
            ? `?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
            : "";

        let query = `${queryBase}${location_query}`;
        const { data } = await axiosReq.get(query);

        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          recommendedProfiles: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfiles();
  }, [currentUser, latitude, longitude, radius]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
