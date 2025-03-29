import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id ? `/${query.id}` : "";

  const data = await $fetch(`https://jsonplaceholder.typicode.com/users${id}`);
  return data;
});
