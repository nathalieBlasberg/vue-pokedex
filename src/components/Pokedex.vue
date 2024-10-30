<template>
  <div v-if="isListAvailable" class="grid grid-cols-4 gap-4 mb-2">
    <PokemonListEntry
      v-for="pokemon in pokemonList"
      :key="pokemon.name"
      :pokemonUrl="pokemon.url"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { NamedAPIResource } from "@/const/api-resources.type";
import PokemonListEntry from "@/components/PokemonListEntry.vue";

interface props {
  pokemonList: Array<NamedAPIResource>;
}

const props = defineProps<props>();

const isListAvailable = computed(() => props.pokemonList.length > 0);
</script>

<style scoped lang="scss"></style>
