export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const API_URL = config.public.API_URL;
  const id = event.context.params?.id;

  if (!id || isNaN(Number(id))) {
    console.error("Geçersiz ID:", id);
    throw createError({
      statusCode: 400,
      statusMessage: "Geçersiz ID! Sadece sayısal değer giriniz.",
    });
  }

  try {
    const data = await $fetch(`${API_URL}/users/${id}`);

    if (!data) {
      console.error("Kullanıcı bulunamadı:", id);
      throw createError({
        statusCode: 404,
        statusMessage: `Kullanıcı bulunamadı! ID: ${id}`,
      });
    }

    return data;
  } catch (error) {
    console.error("API isteğinde hata:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Sunucu hatası! Lütfen tekrar deneyin.",
    });
  }
});
