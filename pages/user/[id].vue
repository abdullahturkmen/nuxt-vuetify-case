<script setup>
const route = useRoute();
const loading = ref(true);
const user = ref(null);

const fetchUserDetail = async () => {
  try {
    const { data } = await useFetch(`/api/users/${route.params.id}`);
    user.value = data.value;
  } catch (error) {
    console.error("Veri alınırken hata oluştu", error);
  } finally {
    loading.value = false;
  }
};

fetchUserDetail();
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
                :src="`https://robohash.org/${user?.id}.png`"
                alt="User Avatar"
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
          <v-card-actions>
            <v-btn to="/" color="secondary" block> Geri Dön </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="user">
      <v-col><Map :userDetail="user" /></v-col>
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
