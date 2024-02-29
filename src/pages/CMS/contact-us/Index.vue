<template lang="pug">
div(v-html="data.content")
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';

import translations from './loc';

export default defineComponent({
	setup() {
		const data = ref({} as any);
		//
		const init = async () => {
			Utils.helper.patchTranslation('contact-us', translations);
			data.value = await Service.cms.getPage('contact-us');
		};
		//
		onBeforeMount(async () => await init());
		return {
			data,
		};
	},
});
</script>
