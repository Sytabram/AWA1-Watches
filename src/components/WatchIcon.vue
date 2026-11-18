<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const now = ref(new Date());
const numerals = [['XII', 100, 45], ['III', 157, 105], ['VI', 100, 167], ['IX', 43, 105]];
let timer;
onMounted(() => { timer = setInterval(() => { now.value = new Date(); }, 1000); });
onUnmounted(() => clearInterval(timer));
</script>

<template>
  <svg viewBox="0 0 200 200" role="img" aria-label="Montre squelette, découvrir la collection" class="watch-svg">
    <circle class="case" cx="100" cy="100" r="92"/>
    <rect class="crown" x="190" y="92" width="8" height="16" rx="2"/>
    <circle class="dial" cx="100" cy="100" r="82"/>

    <line v-for="i in 12" :key="i" class="tick" x1="100" y1="22" x2="100" y2="29" :transform="`rotate(${i * 30} 100 100)`"/>
    <text v-for="[label, x, y] in numerals" :key="label" class="numeral" :x="x" :y="y">{{ label }}</text>

    <path class="bridge" d="M70 118 Q100 82 131 116"/>
    <path class="bridge" d="M100 62 L100 100"/>
    <circle class="gear gear-gold" cx="70" cy="118" r="18"/>
    <circle class="gear-inner" cx="70" cy="118" r="11"/>
    <circle class="gear gear-steel" cx="131" cy="116" r="13"/>
    <circle class="gear-inner" cx="131" cy="116" r="7"/>
    <circle class="gear gear-steel" cx="128" cy="80" r="8"/>
    <circle class="balance" cx="100" cy="64" r="13"/>
    <line class="balance" x1="87" y1="64" x2="113" y2="64"/>
    <line class="balance" x1="100" y1="51" x2="100" y2="77"/>

    <circle class="subdial" cx="100" cy="134" r="15"/>
    <g :transform="`rotate(${now.getSeconds() * 6} 100 134)`">
      <line class="seconds" x1="100" y1="134" x2="100" y2="121"/>
    </g>

    <g :transform="`rotate(${(now.getHours() % 12) * 30 + now.getMinutes() / 2} 100 100)`">
      <line class="hour" x1="100" y1="100" x2="100" y2="60"/>
    </g>
    <g :transform="`rotate(${now.getMinutes() * 6} 100 100)`">
      <line class="minute" x1="100" y1="100" x2="100" y2="38"/>
    </g>
    <circle class="hub" cx="100" cy="100" r="5"/>
  </svg>
</template>