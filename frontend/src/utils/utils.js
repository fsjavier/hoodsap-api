import { axiosReq } from "../api/axiosDefault";

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