<template>
  <v-row>
    <v-col v-for="user in users" :key="user.id" cols="12" sm="6" md="4" lg="3">
      <v-card class="user-card" elevation="4" :to="`/user/${user.id}`">
        <v-card-title>
          <img
            :src="user.img ? user.img : `https://robohash.org/${user.id}.png`"
            :alt="user.name"
            width="100%"
          />
        </v-card-title>
        <v-card-subtitle class="text-truncate text-center">
          {{ user.name }}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn :to="`/user/${user.id}`" color="primary" block>
            Detayları Gör
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  users: Array,
});
</script>
