<template>
  <div v-if="isUrlAvailable" class="max-w-fit">
    <div
      v-if="isPokemonAvailable"
      class="rounded-md bg-gradient-to-b from-gold to-dark-gold p-0.5"
    >
      <div class="bg-white rounded-md">
        <div>
          <img :src="pokemon.sprites.other['official-artwork'].front_default" />
        </div>

        <div class="divider">
          <div class="line-wrap">
            <div class="divider-wrap line-wrap-left"></div>
            <div class="divider-line"></div>
            <div class="divider-wrap line-wrap-right"></div>
          </div>
        </div>

        <div class="px-5 pb-3">
          <p class="mb-2 uppercase text-sm text-slate-600">
            {{ displayPokemonOrder }}
          </p>

          <p class="text-2xl capitalize mb-1">
            {{ pokemon.name }}
          </p>

          <div class="flex">
            <div
              v-for="types in pokemon.types"
              :key="types.type.name"
              :class="[
                bgColorForType[types.type.name],
                'text-xs text-white font-medium me-1 px-2.5 py-0.5 rounded capitalize',
              ]"
            >
              {{ types.type.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { type Characteristic, type Pokemon } from "../const/api-resources.type";
import { bgColorForType } from "../const/types.const";

interface props {
  pokemonUrl: string;
}

const props = defineProps<props>();

const pokemon = ref<Pokemon>();
const characteristic = ref<Characteristic>();

onMounted(() => {
  fetchPokemon();
});

const isUrlAvailable = computed(() => props.pokemonUrl.length > 0);

const isPokemonAvailable = computed(() => !!pokemon.value);

const displayPokemonOrder = computed(() => {
  const order = pokemon.value?.order;

  if (!order) return "";

  if (order < 10) return `Nr. 000${order}`;

  if (order < 100) return `Nr. 00${order}`;

  if (order < 1000) return `Nr. 0${order}`;

  return `Nr. ${order}`;
});

function fetchPokemon(): void {
  if (props.pokemonUrl.length === 0) return;

  const request = new Request(props.pokemonUrl, { method: "GET" });
  fetch(request)
    .then((data) => data.json())
    .then((data: Pokemon) => {
      pokemon.value = data;
    });
}

function fetchCharacteristics(): void {
  if (!pokemon.value) return;

  if (!pokemon.value.id) return;

  const request = new Request(
    `https://pokeapi.co/api/v2/characteristic/${pokemon.value.id}/`,
    { method: "GET" },
  );
  fetch(request)
    .then((data) => data.json())
    .then((data: Characteristic) => (characteristic.value = data));
}
</script>

<style scoped lang="scss">
.divider {
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  height: 16px;
}

.line-wrap {
  display: grid;
  grid-template-columns: 10px 1fr 10px;
  height: 100%;
}

.divider-wrap {
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 100% auto;
  content: "";
  height: 100%;
  position: relative;
  z-index: 1;
}

.line-wrap-left {
  background-image: url(../assets/images/divider-endcap-simple-left-2x.png);
}

.line-wrap-right {
  background-image: url(../assets/images/divider-endcap-simple-right-2x.png);
}

.divider-line {
  background-image: url(../assets/images/divider-slice-2x.png);
  background-position: 50% 50%;
  background-repeat: repeat-x;
  background-size: 1px auto;
  height: 100%;
  margin: 0 -6px;
}
</style>
