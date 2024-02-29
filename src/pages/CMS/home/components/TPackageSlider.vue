<template lang="pug">
.back-slider-category
	carousel(v-bind="settings", :breakpoints="breakpoints")
		slide(v-for="(pkg, index) in packages", :key="index")
			q-card()
				q-card-section()
					t-image(:src="pkg.image??pkg.template?.image",height="100%",width="200px")
					q-card-section.text-align-left()
						h2.text-bold {{ $s.pkg.getDisplayName(pkg) }}
						h3(dir="rtl").text-bold {{ `${$f.currencyFormat(pkg.totalPackagePrice,'IRR')}` }}
						q-separator 
						div(dir="rtl") {{ `${$u.date.getNights(pkg.startDate,pkg.endDate)} ${$t('and')} ${$u.date.getNights(pkg.startDate,pkg.endDate,true)-1} ${$t('day')}` }}
						div(v-html="$u.helper.isNilOrEmpty(pkg.description)?pkg.template?.description:pkg.description") 
</template>
<style lang="scss" src="../../../../css/cms/shared.scss"></style>
<style scoped lang="scss" src="./TPackageSlider.scss"></style>
<script>
import { ref, onBeforeMount } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';
import { TPackageStatus } from 'services';
import { TImage } from '@components';

export default {
	name: 'Breakpoints',
	components: {
		Carousel,
		Slide,
		Navigation,
		TImage,
	},
	setup() {
		const packages = ref([]);

		const allPackages = async () => {
			const response = (
				await Service.pkg.getPackages(
					{ pageNo: 0, rowsPerPage: 5 },
					TPackageStatus.Active,
					'sort=startDate:DESC&populate=departure,template.image,image'
				)
			)?.data;
			packages.value = response;
		};
		//
		const init = async () => {
			await allPackages();
		};
		//
		onBeforeMount(async () => await init());

		return {
			settings: ref({
				itemsToShow: 1,
				snapAlign: 'center',
			}),
			breakpoints: ref({
				700: {
					itemsToShow: 3,
					snapAlign: 'center',
				},
				1024: {
					itemsToShow: 4,
					snapAlign: 'start',
				},
			}),
			packages,
		};
	},
};
</script>
