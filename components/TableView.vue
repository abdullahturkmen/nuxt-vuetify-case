<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="[
          { title: '', align: 'start', key: 'img' },
          { title: 'User', align: 'start', key: 'name' },
          { title: 'Email', align: 'start', key: 'email' },
          { title: 'Phone', align: 'start', key: 'phone' },
          { title: 'Company', align: 'start', key: 'company.name' },
        ]"
        :items="users"
        item-value="id"
        class="elevation-1"
        @click:row="handleClick"
      >
        <template v-slot:item.img="{ index, item }">
          <img
            :src="`https://robohash.org/${item?.id}.png`"
            alt="User Avatar"
            width="48"
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
