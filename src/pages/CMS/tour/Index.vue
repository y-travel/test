<template lang="pug">
router-view
</template>
<style lang="scss">
.q-checkbox__icon {
	border-radius: 2px;
	border-style: solid;
	border-width: 1px;
	border-color: grey;
}
.disabled {
	.q-checkbox__icon {
		background-color: #d8d8d8;
		border-color: #d8d8d8;
	}
}
</style>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
	setup() {
		const init = async () => {};
		//
		onMounted(async () => await init());
		//
		return {};
	},
});
</script>
