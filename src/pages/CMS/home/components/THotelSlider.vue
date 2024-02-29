<template lang="pug">
.back-slider-category
	carousel(v-bind="settings", :breakpoints="breakpoints")
		slide(v-for="(hotel, index) in hotels", :key="index")
			q-card(style="width:100%;")
				t-image(:src="hotel.image",width="100%" )
				.detail-hotel-slider
					t-discount.sale(v-show="showDiscount",dir="rtl", percentage="22",status="Active")
				q-card-section
					h2 {{ `${$t('hotel')} ${hotel.name}` }}
					q-rating(v-model="hotel.star",size="1em",color="orange",readonly)
					q-separator
					div.q-ma-sm(v-if="hotel.price") {{`${$t('home.pricePerNight')} ${$t('from')} ${$f.currencyFormat(hotel.price.min,'IRR')}`}}
					q-btn.q-ma-sm.q-pr-xl(:label="$t('reserve')",color="green",text-color="white",:to="{name:`Cms.Hotel.Details`,params:{id:hotel.id}}")

</template>
<style scoped src="./THotelSlider.scss" lang="scss"></style>

<script lang="ts">
import { ref, defineComponent, onBeforeMount } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

import { TImage } from '@components';

import 'vue3-carousel/dist/carousel.css';
import { TDiscount } from '@components';

export default defineComponent({
	name: 'Breakpoints',
	components: {
		Carousel,
		Slide,
		Navigation,
		TImage,
		TDiscount,
	},
	setup() {
		const settings = ref({
			itemsToShow: 1,
			snapAlign: 'center',
		});

		const breakpoints = ref({
			700: {
				itemsToShow: 2,
				snapAlign: 'center',
			},
			1024: {
				itemsToShow: 4,
				snapAlign: 'start',
			},
		});
		// send request and get hote
		const dollar = ref(0);
		const hotels = ref([] as IHotel[]);
		const priceHotel = ref([]);
		//
		const init = async () => {
			dollar.value = await Utils.helper.convertCurrency(1);
			await allHotel();
			await getPriceHotel();
		};
		//
		const allHotel = async () => {
			const response = await Service.hotel.getHotels(`populate=image`);
			hotels.value = response;
		};
		// get price room in hotel
		const getPriceHotel = async () => {
			const stats = await Service.hotel.getRoomTypeStatsEx(
				{ fromDate: Utils.date.getNow(true), toDate: Utils.date.getNow(true) },
				hotels.value.map((x) => x.id),
				'',
				false
			);
			hotels.value.forEach((hotel) => {
				const stat = stats?.priceStats?.find((x) => x.hotel_id == hotel.id);
				hotel.price = { min: (stat?.min_price ?? 0) * dollar.value, max: (stat?.max_price ?? 0) * dollar.value };
			});
		};
		//
		onBeforeMount(async () => await init());
		//
		return {
			settings,
			breakpoints,
			hotels,
			priceHotel,
			showDiscount: ref(false), //TODO implement, temporary used
		};
	},
});
</script>
