<template>
  <div class="w-screen h-screen p-2 bg-gray-50">
    <!-- <LoginPage></LoginPage> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Axios from './helpers/axios'
// import RouterView from 'vue-router'

interface Todo {
  "userId": number
  "id": number
  "title": string;
  "completed": boolean;
}

const lists = ref<Todo[]>([])

onMounted(async () => {
  lists.value = (await Axios.get('/api/v1/user')).data;

  console.log("🚀 ~ file: App.vue:17 ~ onMounted ~ data.value:", lists.value)
})
</script>
 