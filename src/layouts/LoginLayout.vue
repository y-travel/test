<template lang="pug">
router-view
</template>
<script lang="ts">
import { changeImagesBaseUrl, changeLayoutDirection } from 'utils';
import { defineComponent, onBeforeMount } from 'vue'

export default defineComponent({
	setup() {
		onBeforeMount(() => {
			changeImagesBaseUrl(document.documentElement);
			changeLayoutDirection('rtl');
		});
	},
})
</script>
