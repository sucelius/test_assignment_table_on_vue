<script setup lang="ts">
import { Ref, computed, ref } from "vue";
import formateTime from "../utils.ts";

interface SortObject {
  [key: string]: any;
}

type SortFunction<T> = (a: T, b: T) => number;

const countUserOnPage = 5;

const startPage = ref(0);
const endPage = ref(countUserOnPage);
const pageNumber = ref();
const sortType: Ref<{
  id: string;
  name: string;
  age: string;
}> = ref({
  id: "asc",
  name: "asc",
  age: "asc",
});

const data = ref([
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

const filterdItems = computed(() => {
  return data.value.slice(startPage.value, endPage.value);
});

const totalUsers = computed(() => {
  return data.value.length;
});

const totalPages = computed(() => {
  return totalUsers.value / countUserOnPage;
});

const increasePage = (): void => {
  if (endPage.value < totalUsers.value) {
    startPage.value += countUserOnPage;
    endPage.value += countUserOnPage;
  }
};

const decreasePage = (): void => {
  if (startPage.value > 0) {
    startPage.value -= countUserOnPage;
    endPage.value -= countUserOnPage;
  }
};

const moveToCurrentPage = (userNumberOfPage: number): void => {
  if (userNumberOfPage > 0 && !null && userNumberOfPage <= totalPages.value) {
    const startIndex =
      userNumberOfPage === 0
        ? 0
        : countUserOnPage * userNumberOfPage - countUserOnPage;
    const endIndex =
      userNumberOfPage === 0
        ? countUserOnPage * userNumberOfPage + countUserOnPage
        : countUserOnPage * userNumberOfPage;
    startPage.value = startIndex;
    endPage.value = endIndex;
  }
  pageNumber.value = null;
};

const sortFunctions: {
  [key: string]: SortFunction<SortObject>;
} = {
  id: (a, b) => b.id - a.id,
  name: (a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0),
  age: (a, b) => b.age - a.age,
};

const sortBy = (_column: keyof typeof sortType.value) => {
  const sortTypeValue = sortType.value[_column];

  if (sortTypeValue === "asc") {
    data.value.sort(sortFunctions[_column]);
    sortType.value[_column] = "desc";
  } else {
    data.value.sort((a, b) => sortFunctions[_column](b, a));
    sortType.value[_column] = "asc";
  }
};
</script>

<template>
  <div class="block">
    <h1 class="text-2xl text-center my-5">Custom Table</h1>
    <div class="container block mx-auto my-20 text-center border">
      <table class="items-center bg-transparent w-full border-collapse">
        <thead>
          <tr>
            <th class="title-th cursor-pointer" @click="sortBy('id')">ID</th>
            <th class="title-th cursor-pointer" @click="sortBy('name')">
              Name
            </th>
            <th class="title-th cursor-pointer" @click="sortBy('age')">Age</th>
            <th class="title-th">Last Login</th>
            <th class="title-th" @click="">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filterdItems" :key="user.id">
            <td class="data-th">{{ user.id }}</td>
            <td class="data-th">{{ user.name }}</td>
            <td class="data-th">{{ user.age }}</td>
            <td class="data-th">{{ formateTime(user.last_login) }}</td>
            <td class="data-th cursor-pointer">
              <button class="justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex my-10 justify-end">
        <div class="mb-4 flex w-60 flex-wrap">
          <input
            class="m-0 -mr-0.5 block w-12 min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            v-model.lazy="pageNumber"
            type="number"
            placeholder="Page number"
          />
          <button
            class="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            @click="moveToCurrentPage(pageNumber)"
          >
            Move to
          </button>
        </div>
        <div class="ml-2.5 mb-4 flex w-60 flex-wra">
          <button
            class="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            @click="decreasePage()"
          >
            <svg
              class="w-[18px] h-[18px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
              />
            </svg>
          </button>
          <button
            class="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            @click="increasePage()"
          >
            <svg
              class="w-[18px] h-[18px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
