<template lang="pug">
.bg-white.text-white.text-center.q-pa-md.flex.flex-center
	.col
		q-img(src="404.png",fit="contain",style="width: 700px")
		div
			q-btn.q-mt-xl(color="blue", unelevated, to="/", :label="$t('goHome')").
		  
</template>

<script>

</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404'
})
</script>
