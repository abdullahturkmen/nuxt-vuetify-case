export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const API_URL = config.public.API_URL;
  const id = event.context.params?.id;

  if (!id || isNaN(Number(id))) {
    console.error("Geçersiz ID:", id);
  }

  try {
    let data = await $fetch(`${API_URL}/users/${id}`);

    if (data.id === 1) {
      Object.assign(data, {
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
      });
    }

    return data;
  } catch (error) {
    console.error("API isteğinde hata:", error);
  }
});
