<template>
  <div class="container mx-auto px-60">
    <pagination
      v-if="isPaginationAvailable"
      @update-page="onUpdatePage"
      :count="count"
      :prevUrl="prevUrl"
      :nextUrl="nextUrl"
      :from="fromCount"
      :to="toCount"
    />
    <PokeDex :pokemonList="pokemonList" />
    <pagination
      v-if="isPaginationAvailable"
      @update-page="onUpdatePage"
      :count="count"
      :prevUrl="prevUrl"
      :nextUrl="nextUrl"
      :from="fromCount"
      :to="toCount"
    />
  </div>
</template>

<script setup lang="ts">
import PokeDex from "@/components/PokeDex.vue";
import pagination from "@/components/pagination.vue";
import { ref, onMounted, computed } from "vue";
import {
  type NamedAPIResource,
  type NamedAPIResourceList,
} from "@/const/api-resources.type";
import { Direction } from "@/const/definition.const";

const pokemonList = ref<NamedAPIResource[]>([]);
const currentUrl = ref(import.meta.env.VITE_FIRST_URL);
const prevUrl = ref("");
const nextUrl = ref("");
const count = ref(0);

const fromCount = ref(1);
const toCount = ref(20);

onMounted(() => {
  fetchPokemonList(currentUrl.value);
});

const isPaginationAvailable = computed(() => {
  return (
    !!pokemonList.value &&
    !!pokemonList.value[0] &&
    !!pokemonList.value[pokemonList.value.length - 1] &&
    !!count.value
  );
});

function fetchPokemonList(url: string): void {
  const request = new Request(url, { method: "GET" });
  fetch(request)
    .then((promise) => promise.json())
    .then((data: NamedAPIResourceList) => assignValues(data))
    .catch((error) => console.log(error));
}

function assignValues(data: NamedAPIResourceList): void {
  pokemonList.value = [...data.results];
  prevUrl.value = data.previous ?? "";
  nextUrl.value = data.next ?? "";
  count.value = data.count;
}

function updateCountRange(direction: Direction): void {
  const limit = parseInt(import.meta.env.VITE_LIMIT);

  if (direction === Direction.prev) {
    fromCount.value = fromCount.value - limit;
    toCount.value = toCount.value - limit;
  }

  if (direction === Direction.next) {
    fromCount.value = fromCount.value + limit;
    toCount.value = toCount.value + limit;
  }
}

function onUpdatePage(direction: Direction, url: string) {
  if (!direction) return;

  if (url.length === 0) return;

  fetchPokemonList(url);
  updateCountRange(direction);
}
</script>

<style lang="scss"></style>
