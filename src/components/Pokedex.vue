<template>
  <div v-for="entry in pokeList">
    <div>{{ entry }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type NamedAPIResource, type NamedAPIResourceList } from '@/const/api-resources.type';

const pokeList = ref<NamedAPIResource[]>([]);
const currentUrl = ref('https://pokeapi.co/api/v2/pokemon');
const prevUrl = ref('');
const nextUrl = ref('');

onMounted(() => {
  const request = new Request(currentUrl.value, { method: 'GET'});
  fetch(request)
  .then((promise) => promise.json())
  .then((data: NamedAPIResourceList) => {
    pokeList.value = [...data.results];
    prevUrl.value = data.previous;
    nextUrl.value = data.next;
  });
})
</script>

<style scoped lang="scss">
</style>
