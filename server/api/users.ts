import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id ? `/${query.id}` : "";
  const config = useRuntimeConfig();
  const API_URL = config.public.API_URL;

  const data = await $fetch(`${API_URL}/users${id}`);
  return data;
});
