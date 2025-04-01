<script setup>
const error = useError();
defineProps({
  error: Object,
});
</script>

<template>
  <NuxtLayout>
    <div class="error-container">
      <h1>Hata: {{ error.statusCode }}</h1>
      <NuxtLink to="/">Ana Sayfaya Dön</NuxtLink>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.error-container {
  text-align: center;
  margin-top: 50px;
}
</style>
