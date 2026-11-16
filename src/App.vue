<script setup>
import { computed, onMounted, ref } from 'vue';
const watches = ref([]), loading = ref(true), error = ref('');
const featured = computed(() => watches.value.find(w => w.vedette));
const filter = ref('Toutes');
const types = computed(() => ['Toutes', ...new Set(watches.value.map(w => w.type))]);
const filtered = computed(() =>
    filter.value === 'Toutes' ? watches.value : watches.value.filter(w => w.type === filter.value)
);
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
  <header class="nav">
    <span class="logo">AWA Watches</span>
    <a href="#collection">Catalogue</a>
  </header>

  <section class="hero">
    <div>
      <p class="eyebrow">Collection Tissot · Swiss Made</p>
      <h1>L'art du temps,<br>à votre poignet</h1>
      <p class="lead">Douze montres suisses choisies pour leur élégance et leur fiabilité.</p>
      <a class="btn" href="#collection">Découvrir la collection</a>
    </div>
    <img v-if="featured" :src="featured.image" :alt="featured.nom" class="hero-img">
  </section>

  <main id="collection">
    <h2 class="section-title">Notre collection</h2>
    <p class="muted">{{ filtered.length }} montres Swiss Made</p><div class="filters">
    <button v-for="t in types" :key="t" :class="{ active: t === filter }"
            :aria-pressed="t === filter" @click="filter = t">{{ t }}</button>
  </div>

    <p v-if="loading">Chargement…</p>
    <p v-if="error" role="alert">{{ error }}</p>
    <section class="grid">
      <article v-for="w in filtered" :key="w.id" class="card" tabindex="0">
        <img :src="w.image" :alt="w.nom">
        <div class="card-body">
          <p class="type">{{ w.type }}</p>
          <h3>{{ w.nom }}</h3>
          <p class="muted">{{ w.diametre_mm }} mm · {{ w.mouvement }}</p>
          <p class="price">CHF {{ w.prix_chf }}.–</p>
        </div>
      </article>
    </section>
  </main>

  <footer class="footer">AWA Watches · Projet AWA1 — CPNV</footer>
</template>