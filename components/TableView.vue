<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="[
          { title: '', align: 'start', key: 'img' },
          { title: 'Kullanıcı', align: 'start', key: 'name' },
          { title: 'Email', align: 'start', key: 'email' },
          { title: 'Telefon', align: 'start', key: 'phone' },
          { title: 'Şirket', align: 'start', key: 'company.name' },
        ]"
        :items="users"
        item-value="id"
        class="elevation-1"
        @click:row="handleClick"
      >
        <template v-slot:item.img="{ index, item }">
          <img
            :src="item.img ? item.img : `https://robohash.org/${item.id}.png`"
            :alt="item.name"
            width="48"
            class="mt-1"
          />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script setup>
const router = useRouter();

defineProps({
  users: Array,
});

const handleClick = (row, data) => {
  router.push(`/user/${data?.item?.id}`);
};
</script>
