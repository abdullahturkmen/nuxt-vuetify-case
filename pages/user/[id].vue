<script setup>
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const user = ref(null);

const fetchUserDetail = async () => {
  try {
    const { data } = await useFetch(`/api/users/${route.params.id}`);
    user.value = data.value;
  } catch (error) {
    console.error("Veri alınırken hata oluştu", error);
  } finally {
    if (user.value == null) {
      router.push("/");
    }
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

fetchUserDetail();

watchEffect(() => {
  if (user.value) {
    useHead({
      title: `${user?.value?.name}`,
      meta: [
        {
          name: "description",
          content: `View the profile of ${user?.value?.name} - ${user?.value?.email}`,
        },
      ],
    });
  }
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <v-skeleton-loader v-if="loading" type="card" />
        <v-card v-else class="user-detail-card" elevation="6">
          <v-card-title>
            <v-avatar color="primary" size="128" class="mr-3">
              <img
                :src="
                  user?.img ? user?.img : `https://robohash.org/${user?.id}.png`
                "
                :alt="user?.name"
                width="100%"
              />
            </v-avatar>
            <span class="text-h5">{{ user?.name }}</span>
          </v-card-title>
          <v-card-subtitle
            ><a :href="`mailto:${user?.email}`">{{
              user?.email
            }}</a></v-card-subtitle
          >
          <v-card-text>
            <p>
              <strong>Telefon:</strong>
              <a :href="`tel:${user?.phone}`">{{ user?.phone }}</a>
            </p>
            <p><strong>Şirket:</strong> {{ user?.company?.name }}</p>
            <p>
              <strong>Adres:</strong> {{ user?.address?.street }},
              {{ user?.address?.suite }},
              {{ user?.address?.city }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="user && !loading">
      <v-col cols="12" md="8" class="mx-auto"><Map :userDetail="user" /></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <v-card-actions>
          <v-btn to="/" color="secondary" block> Geri Dön </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.user-detail-card {
  padding: 20px;
  border-radius: 12px;
  transition: box-shadow 0.3s ease-in-out;
}
.user-detail-card:hover {
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
