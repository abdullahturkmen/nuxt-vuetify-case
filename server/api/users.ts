import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id ? `/${query.id}` : "";
  const config = useRuntimeConfig();
  const API_URL = config.public.API_URL;

  const nameFilter = query.name || "";

  const data = await $fetch(`${API_URL}/users${id}`);

  if (Array.isArray(data) && data.length > 0) {
    data[0] = {
      ...data[0],
      id: 1,
      name: "Abdullah Türkmen",
      username: "abdullahturkmen",
      email: "abdullahtrkmn13@gmail.com",
      phone: "+90 537 299 70 45",
      website: "abdullahturkmen.com",
      company: {
        name: "Fair Teknoloji",
        catchPhrase: "Innovate, Create, Dominate",
        bs: "Full-stack development and design",
      },
      img: "https://abdullahturkmen.com/abdullah-turkmen-avatar.jpg",
      address: {
        street: "Esentepe Mh. 2385 Sk.",
        suite: "No. 556",
        city: "Sultangazi / İstanbul",
        zipcode: "34265",
        geo: {
          lat: "41.097745",
          lng: "28.878391",
        },
      },
    };
  }

  let filteredData = data;

  if (nameFilter) {
    filteredData = filteredData.filter((user) =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  return filteredData;
});
