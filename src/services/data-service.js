import { client } from "../utils/api-client";

function useDataService(endpoint) {
  const GetAll = async () => {
    const data = await client(endpoint, {});
    return data;
  };

  const GetById = async (id) => {
    const data = await client(`${endpoint}/${id}`, {});
    return data;
  };

  const Insert = async (insData) => {
    const data = await client(`${endpoint}`, { data: insData });
    return data;
  };

  const Edit = async (updData) => {
    const data = await client(`${endpoint}`, { data: updData, method: "PUT" });
    return data;
  };

  const Remove = async (delData) => {
    const data = await client(`${endpoint}`, {
      data: delData,
      method: "DELETE",
    });
    return data;
  };

  return [GetAll, GetById, Insert, Edit, Remove];
}

export { useDataService };
