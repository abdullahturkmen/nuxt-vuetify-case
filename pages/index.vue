<script setup>
const users = ref([]);
const loading = ref(true);

const fetchUsers = async () => {
  try {
    const { data } = await useFetch("/api/users");
    users.value = data.value;
  } catch (error) {
    console.error("Veri alınırken hata oluştu", error);
  } finally {
    loading.value = false;
  }
};

fetchUsers();
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
      <v-col
        v-else
        v-for="user in users"
        :key="user.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="user-card" elevation="4">
          <v-card-title>
            <v-avatar color="primary" class="mr-2">{{ user.name[0] }}</v-avatar>
            {{ user.name }}
          </v-card-title>
          <v-card-subtitle class="text-truncate">{{
            user.email
          }}</v-card-subtitle>
          <v-card-actions>
            <v-btn :to="`/user/${user.id}`" color="primary" block>
              Detayları Gör
            </v-btn>
          </v-card-actions>
        </v-card>
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
