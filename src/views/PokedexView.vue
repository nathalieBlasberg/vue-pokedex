<template>
  <div class="container mx-auto px-60">
    <PokeDex :pokemonList="pokemonList" />
  </div>
</template>

<script setup lang="ts">
import PokeDex from "@/components/PokeDex.vue";
import { ref, onMounted } from "vue";
import {
  type NamedAPIResource,
  type NamedAPIResourceList,
} from "@/const/api-resources.type";

const pokemonList = ref<NamedAPIResource[]>([]);
const currentUrl = ref("https://pokeapi.co/api/v2/pokemon");
const prevUrl = ref("");
const nextUrl = ref("");

onMounted(() => {
  fetchPokemonList();
});

function fetchPokemonList(): void {
  const request = new Request(currentUrl.value, { method: "GET" });
  fetch(request)
    .then((promise) => promise.json())
    .then((data: NamedAPIResourceList) => assignValues(data));
}

function assignValues(data: NamedAPIResourceList): void {
  pokemonList.value = [...data.results];
  prevUrl.value = data.previous;
  nextUrl.value = data.next;
}
</script>

<style lang="scss"></style>
