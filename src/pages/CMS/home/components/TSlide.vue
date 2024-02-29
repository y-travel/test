<template lang="pug">
.row
	.show-photo-hotel
		.link-hotel
			t-image.rounded-borders(:src="data.side1",width="100%",height="200px",:show-large="true")
		.link-hotel
			t-image.rounded-borders(:src="data.side2",width="100%",height="200px",:show-large="true")
	.slider-header
		.q-pa-md
			t-gallery.rounded-borders(:images="data.hotelImages")
</template>
<style lang="scss" src="./TSlide.scss"></style>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { TGallery, TImage } from '@components';

export default defineComponent({
	name: 't-slide',
	components: { TGallery, TImage },
	setup() {
		const data = ref({ hotelImages: [], tourImages: [] } as any);
		//
		const init = async () => {
			await getData();
		};
		//
		const getData = async () => {
			data.value = await Service.cms.getPage('home', 'populate=hotelImages,tourImages,side1,side2');
		};
		//
		onBeforeMount(async () => await init());
		return {
			tab: ref('hotel-tab'),
			data,
		};
	},
});
</script>
