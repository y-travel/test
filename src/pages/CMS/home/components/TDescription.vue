<template>
	<div v-html="description?.content" class="q-flex show-desc-home"></div>
</template>

<style lang="scss" src="./TDescription.scss"></style>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

const description = ref({} as any);

const init = async () => {
	getDescription();
};

const getDescription = async () => {
	const desc_Home_page = await Service.cms.getPage('home');
	description.value = desc_Home_page;
	console.log(description.value);
};

onBeforeMount(async () => await init());
</script>
