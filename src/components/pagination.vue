<template>
  <div class="flex items-center justify-between bg-white mb-3">
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ from }}</span>
          to
          <span class="font-medium">{{ to }}</span>
          of
          <span class="font-medium">{{ count }}</span>
          results
        </p>
      </div>
      <div>
        <nav class="flex justify-between">
          <button
            @click="onButtonClick(Direction.prev, props.prevUrl)"
            class="bg-transparent text-gold font-semibold hover:bg-gold hover:text-white py-2 px-4 me-2 border border-gold hover:border-transparent rounded"
            :class="{
              'opacity-50 cursor-not-allowed': isPrevDisabled,
            }"
          >
            Previous
          </button>
          <button
            @click="onButtonClick(Direction.next, props.nextUrl)"
            class="bg-transparent text-gold font-semibold hover:bg-gold hover:text-white py-2 px-4 border border-gold hover:border-transparent rounded"
            :class="{
              'opacity-50 cursor-not-allowed': isNextDisabled,
            }"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Direction } from "@/const/definition.const";

interface props {
  count: number;
  prevUrl: string;
  nextUrl: string;
  from: number;
  to: number;
}

const props = defineProps<props>();

const emit = defineEmits(["update-page"]);

const isPrevDisabled = computed(() => isDisabled(props.prevUrl));

const isNextDisabled = computed(() => isDisabled(props.nextUrl));

function isDisabled(url: string): boolean {
  return url.length === 0;
}

function onButtonClick(direction: Direction, url: string) {
  emit("update-page", direction, url);
}
</script>

<style scoped lang="scss"></style>
