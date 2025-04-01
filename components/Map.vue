<script setup>
useHead({
  script: [
    {
      src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
      type: "text/javascript",
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

const map = ref(null);
const mapInitialized = ref(false);

onMounted(() => {
  const checkLeaflet = () => {
    if (typeof window !== "undefined" && window.L) {
      initMap();
    } else {
      setTimeout(checkLeaflet, 100);
    }
  };

  checkLeaflet();
});

function initMap() {
  if (mapInitialized.value) return;

  const L = window.L;
  const details = props.userDetail || null;

  if (!details || !details.address || !details.address.geo) {
    console.error("Kullanıcı konum bilgisi bulunamadı");
    return;
  }

  const { lat, lng } = details.address.geo;

  const mapElement = document.getElementById("map");
  if (!mapElement) {
    console.error("Map element bulunamadı");
    return;
  }

  try {
    map.value = L.map("map").setView([parseFloat(lat), parseFloat(lng)], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value);

    const location = {
      coords: [parseFloat(lat), parseFloat(lng)],
      label: details.name,
      address: `${details.address.street}, ${details.address.suite}, ${details.address.city}`,
      phone: details.phone,
    };

    const popupContent = `<strong>${location.label}</strong><br>${location.address}<br><strong>${location.phone}</strong>`;
    L.marker(location.coords)
      .addTo(map.value)
      .bindPopup(popupContent)
      .openPopup();

    mapInitialized.value = true;
  } catch (error) {
    console.error("Harita başlatılırken hata oluştu:", error);
  }
}

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove();
    map.value = null;
  }
});

watch(
  () => props.userDetail,
  (newValue) => {
    if (map.value) {
      map.value.remove();
      map.value = null;
      mapInitialized.value = false;
    }

    if (newValue) {
      setTimeout(() => {
        initMap();
      }, 100);
    }
  },
  { deep: true }
);
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
