import { axiosReq } from "../api/axiosDefault";
import jwtDecode from "jwt-decode";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const response = await axiosReq.get(resource.next);
    const data = response.data;
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (error) {
    console.log(error);
  }
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? { ...profile, following_count: profile.following_count + 1 }
    : profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? { ...profile, following_count: profile.following_count - 1 }
    : profile;
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatLocation = (location) => {
  const locationFields = [
    "city",
    "town",
    "village",
    "locality",
    "suburb",
    "city_district",
    "postcode",
  ];
  let city;

  for (let field of locationFields) {
    if (location[field]) {
      city = location[field];
      break;
    } else {
      city = "";
    }
  }

  const country = location.country.toUpperCase() || "";

  return `${city}${city && country && ","} ${country}`;
};

export const calculateRadiusStep = (radius) => {
  if (radius < 5000) return 100;
  if (radius < 10000) return 500;
  if (radius < 15000) return 1000;
  if (radius < 50000) return 5000;
  return 10000;
};

export const calculateMapZoom = (radius) => {
  if (radius < 1000) return 14;
  if (radius < 5000) return 12;
  if (radius < 10000) return 10;
  if (radius < 50000) return 8;
  return 5;
};
