<script setup>
import { ref } from "vue";

useHead({
  title: "Nuxt Vuetify Case",
});

const users = ref([]);
const loading = ref(true);
const isGridView = ref(true);

const filterByName = ref(null);

const fetchUsers = async () => {
  try {
    let url = "/api/users";
    if (filterByName.value) {
      url += `?name=${encodeURIComponent(filterByName.value)}`;
    }
    const { data } = await useFetch(url);

    users.value = data.value;
  } catch (error) {
    console.error("Veri alınırken hata oluştu", error);
  } finally {
    loading.value = false;
  }
};

fetchUsers();

watchEffect(() => {
  if (filterByName.value) {
    fetchUsers();
  }
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          label="Kullanıcı Ara"
          variant="outlined"
          v-model="filterByName"
          density="compact"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="text-end mb-4">
        <v-btn
          @click="isGridView = true"
          :color="isGridView ? 'primary' : 'grey'"
          class="mx-1"
        >
          Grid
        </v-btn>
        <v-btn
          @click="isGridView = false"
          :color="!isGridView ? 'primary' : 'grey'"
          class="mx-1"
        >
          Tablo
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-center" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>

    <GridView :users="users" v-if="isGridView" />

    <TableView :users="users" v-if="!isGridView" />
  </v-container>
</template>

<style scoped>
.user-detail-card {
  padding: 20px;
  border-radius: 12px;
  transition: box-shadow 0.3s ease-in-out;
}
.user-detail-card:hover {
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.071);
}
</style>
