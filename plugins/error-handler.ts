export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = async (error, instance, info) => {
    if (error && error.statusCode && error.statusCode >= 400) {
      console.error("Ciddi hata yakalandı:", error);
      await navigateTo("/");
    }
  };

  nuxtApp.hook("vue:error", async (error, instance, info) => {
    if (
      error &&
      typeof error === "object" &&
      "statusCode" in error &&
      error.statusCode >= 400
    ) {
      console.error("Vue hatası yakalandı:", error);
      await navigateTo("/");
    }
  });

  nuxtApp.hook("app:error", async (error) => {
    console.error("App hatası yakalandı:", error);
    await navigateTo("/");
  });
});
