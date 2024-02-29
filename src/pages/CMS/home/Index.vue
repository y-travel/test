<template lang="pug">
.home-page-data
	t-slide
	.title-section
		.title-products
			h2 {{ $t('home.mostViewedHotels') }}
			span
			router-link(:to="{name:'Cms.Hotel.Index'}") {{ $t('cms.seeMore') }}
		t-hotel-slider
	//	tours slider
	.title-section
		.title-products
			h2 {{ $t('cms.interestedPackages') }}
			span
			router-link(:to="{name:'Cms.Package'}") {{ $t('cms.seeMore') }}
		t-package-slider
		.back-city
	.title-section
		.title-products
			h2 {{ $t('home.latestArticle') }}
			span
			router-link(:to="{name:'Cms.Blog'}") {{ $t('cms.seeMore') }}
		t-last-blog
t-description
</template>

<style src="./Index.scss" lang="scss"></style>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';

import TSlide from './components/TSlide.vue';
import THotelSlider from './components/THotelSlider.vue';
import TLastBlog from './components/TLastBlog.vue';
import TDescription from './components/TDescription.vue';
import TPackageSlider from './components/TPackageSlider.vue';
import translations from './loc';

export default defineComponent({
	components: { TSlide, TPackageSlider, THotelSlider, TLastBlog, TDescription },
	setup() {
		//
		const init = async () => {
			Utils.helper.patchTranslation('home', translations);
		};
		//
		//
		onBeforeMount(async () => await init());
		//
		return {};
	},
});
</script>
