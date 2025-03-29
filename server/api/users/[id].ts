export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  console.log("Gelen ID:", id);

  if (!id || isNaN(Number(id))) {
    console.error("Geçersiz ID:", id);
    throw createError({
      statusCode: 400,
      statusMessage: "Geçersiz ID! Sadece sayısal değer giriniz.",
    });
  }

  try {
    const data = await $fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

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
