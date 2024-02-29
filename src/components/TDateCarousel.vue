<template lang="pug">
div
	q-card(v-for="card in cards")
		q-card-section()
			| {{card.date }}
			q-separator(horizontal)
			| {{ card.price}}
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const cards = ref([
      {
        date: '1400-01-01',
        price: 120000,
      },
      {
        date: '1400-01-01',
        price: 120000,
      },
      {
        date: '1400-01-01',
        price: 120000,
      },
    ]);
    return {
      cards,
    };
  },
});
</script>
