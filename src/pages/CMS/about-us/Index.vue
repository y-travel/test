<template lang="pug">
q-inner-loading(:showing="!!loading.data")
div(v-html="data.content")
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';

import translations from './loc';

export default defineComponent({
	setup() {
		const data = ref({} as any);
		const loading = ref({} as any);
		//
		const init = async () => {
			Utils.helper.patchTranslation('about-us', translations);

			loading.value.data = true; //TODO: we have to show loading in layout
			data.value = await Service.cms.getPage('about-us');
			loading.value.data = false;
		};
		//

		//
		onBeforeMount(async () => await init());
		//
		return { data, loading };
	},
});
</script>
