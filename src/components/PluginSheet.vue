<script setup lang="ts">
import { computed, ref } from "vue";
import type { Header } from "vue3-easy-data-table";
import formateTime from "../utils.ts";

const headers: Header[] = [
  { text: "ID", value: "id", sortable: true },
  { text: "NAME", value: "name", sortable: true },
  { text: "AGE", value: "age", sortable: true },
  { text: "LAST LOGIN", value: "last_login" },
  { text: "DELETE", value: "delete" },
];

const items = ref([
  {
    id: 1,
    name: "John Smith",
    age: 25,
    last_login: 1609459200,
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 30,
    last_login: 1609462800,
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 35,
    last_login: 1609466400,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    age: 28,
    last_login: 1609466439,
  },
  {
    id: 5,
    name: "David Thompson",
    age: 32,
    last_login: 1609469543,
  },
  {
    id: 6,
    name: "Emma Davis",
    age: 29,
    last_login: 1609472499,
  },
  {
    id: 7,
    name: "Christopher Anderson",
    age: 36,
    last_login: 1609475900,
  },
  {
    id: 8,
    name: "Olivia Martinez",
    age: 27,
    last_login: 1609479200,
  },
  {
    id: 9,
    name: "Daniel Thomas",
    age: 31,
    last_login: 1609482800,
  },
  {
    id: 10,
    name: "Sophia Brown",
    age: 26,
    last_login: 1609486400,
  },
  {
    id: 11,
    name: "Matthew Taylor",
    age: 33,
    last_login: 1609489456,
  },
  {
    id: 12,
    name: "Ava Clark",
    age: 28,
    last_login: 1609493031,
  },
  {
    id: 13,
    name: "Andrew White",
    age: 34,
    last_login: 1609496400,
  },
  {
    id: 14,
    name: "Isabella Moore",
    age: 29,
    last_login: 1609499000,
  },
  {
    id: 15,
    name: "William Lee",
    age: 37,
    last_login: 1609502400,
  },
  {
    id: 16,
    name: "Mia Lewis",
    age: 28,
    last_login: 1609506000,
  },
  {
    id: 17,
    name: "James Hall",
    age: 32,
    last_login: 1609509600,
  },
  {
    id: 18,
    name: "Charlotte Young",
    age: 27,
    last_login: 1609513200,
  },
  {
    id: 19,
    name: "Benjamin Allen",
    age: 34,
    last_login: 1609516800,
  },
  {
    id: 20,
    name: "Harper Scott",
    age: 30,
    last_login: 1609519599,
  },
  {
    id: 21,
    name: "Henry King",
    age: 35,
    last_login: 1609523200,
  },
  {
    id: 22,
    name: "Amelia Green",
    age: 29,
    last_login: 1609526800,
  },
  {
    id: 23,
    name: "Joseph Baker",
    age: 33,
    last_login: 1609530400,
  },
  {
    id: 24,
    name: "Ella Hill",
    age: 26,
    last_login: 1609534000,
  },
  {
    id: 25,
    name: "Alexander Cook",
    age: 31,
    last_login: 1609537600,
  },
]);

const itemsSelected = ref([]);

const formateItems = computed(() => {
  return items.value.map((el) => {
    return { ...el, last_login: formateTime(el.last_login) };
  });
});
</script>

<template>
  <h1 class="text-2xl text-center">Easy data table</h1>
  <div class="container block mx-auto my-20">
    <EasyDataTable
      v-model:items-selected="itemsSelected"
      :headers="headers"
      :items="formateItems"
      :rows-per-page="5"
      :buttonsPagination="true"
      :rowsItems="[5]"
      class=""
    >
    </EasyDataTable>
  </div>
</template>

<style scoped></style>
