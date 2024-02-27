import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { followHelper, unfollowHelper } from "../utils/utils";

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

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
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
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

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
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
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
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
