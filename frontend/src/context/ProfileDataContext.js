import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { followHelper, unfollowHelper } from "../utils/utils";
import { useRadius } from "./RadiusFilterContext";
import { useDebounce } from "../hooks/useDebounce";

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
  const radius = useRadius();
  const debouncedRadius = useDebounce(radius, 500);
  const latitude = useMemo(() => currentUser?.profile_location_data?.latitude, [currentUser]);
  const longitude = useMemo(() => currentUser?.profile_location_data?.longitude, [currentUser]);

  const handleFollow = useCallback(async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.user_id,
      });

      setProfileData((prevProfileData) => ({
        ...prevProfileData,

        pageProfile: {
          ...prevProfileData.pageProfile,
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
    } catch (error) {}
  }, []);

  const handleUnfollow = useCallback(async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        pageProfile: {
          ...prevProfileData.pageProfile,
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
    } catch (error) {}
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        let queryBase = "/profiles/";
        let locationQuery =
          latitude && longitude && radius !== 200000
            ? `?latitude=${latitude}&longitude=${longitude}&radius=${debouncedRadius}`
            : "";

        let query = `${queryBase}${locationQuery}`;
        const { data } = await axiosReq.get(query);

        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          recommendedProfiles: data,
        }));
      } catch (error) {}
    };

    fetchProfiles();
  }, [latitude, longitude, debouncedRadius]);

  const memoizedProfileData = useMemo(() => profileData, [profileData]);

  return (
    <ProfileDataContext.Provider value={memoizedProfileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
