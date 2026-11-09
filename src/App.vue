<script setup>
import { onMounted, ref } from 'vue';
const watches = ref([]), loading = ref(true), error = ref('');
onMounted(async () => {
  try {
    const response = await fetch('/api/watches');
    if (!response.ok) throw new Error('API indisponible');
    watches.value = await response.json();
  } catch (e) { error.value = e.message; }
  finally { loading.value = false; }
});
</script>

<template>
  <main>
    <h1>L'art du temps, à votre poignet</h1>
    <p v-if="loading">Chargement…</p>
    <p v-if="error" role="alert">{{ error }}</p>
    <section class="grid">
      <article v-for="w in watches" :key="w.id" class="card">
        <img :src="w.image" :alt="w.nom" />
        <p class="type">{{ w.type }}</p>
        <h2>{{ w.nom }}</h2>
        <p>{{ w.diametre_mm }} mm · {{ w.mouvement }}</p>
        <p class="price">CHF {{ w.prix_chf }}.–</p>
      </article>
    </section>
  </main>
</template>