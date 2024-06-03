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
        <h3 class="text-lg font-semibold text-gray-700 mb-2">
          Total Unique Views
        </h3>
        <p class="text-3xl font-bold text-gray-900">{{ uniqueViews }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const analyticsData = ref(null);

onMounted(async () => {
  try {
    const response = await fetch("/api/fetchAnalyticsData");

    if (!response.ok) {
      throw new Error("Failed to fetch analytics data");
    }
    analyticsData.value = await response.json();
  } catch (error) {
    console.error("Error fetching analytics data:", error);
  }
});

const uniqueViews = computed(() => {
  if (!analyticsData.value?.data) return 0;

  const uniqueViewSet = new Set();

  analyticsData.value.data.forEach((view) => {
    // Create a unique identifier for each view
    const uniqueKey = `${view.viewer_application_name}-${view.view_ended_at}`;
    uniqueViewSet.add(uniqueKey);
  });

  return uniqueViewSet.size;
});
</script>
