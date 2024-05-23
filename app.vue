<template>
  <main
    class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 p-6"
  >
    <section
      class="flex flex-col items-center w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div class="w-full bg-gray-800 flex items-center justify-center py-6">
        <CldVideoPlayer
          width="640"
          height="360"
          src="samples/sea-turtle"
          class="rounded-lg"
        />
      </div>
      <div class="w-full p-6">
        <div class="flex justify-center items-center">
          <VideoAnalyticsData />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import VideoAnalyticsData from "@/components/VideoAnalyticsData";
</script>
