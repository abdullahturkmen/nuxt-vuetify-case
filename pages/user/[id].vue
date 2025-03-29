<script setup>
const route = useRoute();
const { data: user } = await useFetch(`/api/users/${route.params.id}`);
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <v-card class="user-detail-card" elevation="6">
          <v-card-title>
            <v-avatar color="primary" size="64" class="mr-3">
              {{ user?.name[0] }}
            </v-avatar>
            <span class="text-h5">{{ user?.name }}</span>
          </v-card-title>
          <v-card-subtitle>{{ user?.email }}</v-card-subtitle>
          <v-card-text>
            <p><strong>Telefon:</strong> {{ user?.phone }}</p>
            <p><strong>Şirket:</strong> {{ user?.company?.name }}</p>
            <p>
              <strong>Adres:</strong> {{ user?.address?.street }},
              {{ user?.address?.city }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/" color="secondary" block> Geri Dön </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
