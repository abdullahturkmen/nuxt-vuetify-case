<script setup>
useHead({
  script: [
    {
      src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
      type: "text/javascript",
      defer: true,
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
    },
  ],
});

const props = defineProps({
  userDetail: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  if (typeof window !== "undefined") {
    const L = window.L;

    const details = props.userDetail || null;
    const { lat, lng } = props.userDetail?.address?.geo || { lat: 0, lng: 0 };
    const modifiedLat = parseFloat(2 - lat);
    const modifiedLng = parseFloat(lng - 28);

    const map = L.map("map").setView([modifiedLat, modifiedLng], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    const location = {
      coords: [modifiedLat, modifiedLng],
      label: details?.name,
      address: `${details?.address?.street}, ${details?.address?.suite}, ${details?.address?.city}`,
      phone: details?.phone,
    };
    const popupContent = `<strong>${location.label}</strong><br>${location.address}<br><strong>${location.phone}</strong>`;
    L.marker(location.coords).addTo(map).bindPopup(popupContent); // İşaretçiye detay ekle
  }
});
</script>

<template>
  <div>
    <div id="map" class="leaflet-map"></div>
  </div>
</template>

<style>
.leaflet-map {
  height: 400px;
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
}
</style>
