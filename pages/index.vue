<script setup>
const { data: users } = await useFetch("/api/users");
</script>

<template>
  <v-container>
    <v-row>
      <v-col
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
