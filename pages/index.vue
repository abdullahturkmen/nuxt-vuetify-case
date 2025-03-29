<script setup>
import { ref } from "vue";

const users = ref([]);
const loading = ref(true);
const isGridView = ref(true);

// Kullanıcıları Fetch etme
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
      <v-col cols="12" class="text-center mb-4">
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
