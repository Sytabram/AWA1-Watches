<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const now = ref(new Date());
let timer;
onMounted(() => { timer = setInterval(() => { now.value = new Date(); }, 1000); });
onUnmounted(() => clearInterval(timer));
</script>

<template>
  <svg viewBox="0 0 200 200" role="img" aria-label="Montre, découvrir la collection" class="watch-svg">
    <circle class="dial" cx="100" cy="100" r="80"/>
    <rect class="crown" x="178" y="92" width="12" height="16" rx="3"/>
    <g :transform="`rotate(${(now.getHours() % 12) * 30 + now.getMinutes() / 2} 100 100)`">
      <line class="hour" x1="100" y1="100" x2="100" y2="55"/>
    </g>
    <g :transform="`rotate(${now.getMinutes() * 6} 100 100)`">
      <line class="minute" x1="100" y1="100" x2="100" y2="35"/>
    </g>
  </svg>
</template>