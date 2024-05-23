<template>
  <div
    v-if="!analyticsData"
    class="flex items-center justify-center w-full mt-8"
  >
    <div
      class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-gray-500"
    ></div>
  </div>
  <div v-else class="flex flex-col items-center w-full">
    <div class="grid grid-cols-1 gap-6 w-full">
      <div class="bg-white rounded-lg p-4 shadow-md text-center">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Total Views</h3>
        <p class="text-3xl font-bold text-gray-900">{{ totalViews }}</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>
