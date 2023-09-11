<template>
  <div>
    <ul>
      <li v-for="list in lists" :key="list.id">
        {{ list.id }} : {{ list.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Axios from './helpers/axios'

interface Todo {
  "userId": number
  "id": number
  "title": string;
  "completed": boolean;
}

const lists = ref<Todo[]>([])

onMounted(async () => {
  lists.value = (await Axios.get('/app')).data;

  console.log("🚀 ~ file: App.vue:17 ~ onMounted ~ data.value:", lists.value)
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
