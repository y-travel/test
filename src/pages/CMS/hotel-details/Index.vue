<template lang="pug">
q-card
	.row.q-pa-lg
		.row.col-xs-12.col-md-shrink
			.col-xs-3.col-sm-auto
				t-discount(percentage="29",type="vertical")
			.col.column
				.row.q-gutter-sm
					h6.text-bold(style="margin:0 5px;text-align: right;") {{ data.name }}
					q-rating(v-model="data.star",size="1em",color="orange",readonly)
				span.text-subtitle2(style="text-align: right;") {{ data.address }}
		q-space
		.row.col-xs-12.col-md-shrink.justify-end.q-gutter-x-sm.self-center(v-show="!$q.screen.lt.sm")
			q-icon.text-grey(name="las la-share-alt",size="xl")
			q-btn(:label="$t('cms.addToFavorites')",text-color="grey",rounded,icon="las la-star")
			q-btn(:label="$t('cms.viewRooms')",rounded,icon="las la-shopping-cart",color="red")
	hr.line
	q-card-section
		.row
			.col-xs-12.col-sm-5.column.q-gutter-y-md
				q-card(flat,bordered)
					.q-py-md.text-grey-8.bg-grey-12 {{ $t('cms.companyImportantServiceForReservationRooms',{company:'نظر گشت طاها'}) }}
					.row.q-pa-md.justify-start
						.col-shrink.q-gutter-x-xs
							q-icon(name="las la-food")
							span آشپز ایرانی
				q-card.card-stats(flat,bordered)
					.row.q-pa-md.q-gutter-x-xs
						.col
							| {{ $t('floorCount') }}
							h5.text-red {{$f.numberFormat(data.floor)}}
						.col
							| {{ $t('roomCount') }}
							h5.text-red {{$f.numberFormat(data.capacity)}}
						.col
							| {{ $t('checkInTime') }}
							h5.text-red {{`${$f.timeFormat(data.checkInTime)}`}}
						.col
							| {{ $t('checkOutTime') }}
							h5.text-red {{`${$f.timeFormat(data.checkOutTime)}`}}
				q-scroll-area(style="min-height: 200px;line-height: 1.7rem;")
					div(style="text-align: justify;",v-html="data.description")
			.col-xs-12.col-sm-7
				.q-pa-sm
					t-gallery(:images="data.gallery??[]",:defaultImage="$s.img.getDefaultImage('hotel')")
q-card.q-mt-md.q-pa-md.bg-red-1(flat,style="line-height: 1.7rem;")
	.text-red.text-align-left {{ `${$t('cms.importantNotes')} ${data.name}` }}
	.text-align-justify(v-html="data.notes")
simple-list(:title="`${$t('cms.hotelRoomList')}`",:rows="data.roomTypes", v-model:pagination="pagination",:loading="loading.data",@request="updateData", :rows-per-page-options="0",grid,grid-header="false",hide-no-data,hide-pagination)
	template(v-slot:item="props")
		q-card.col-12.q-mb-md(flat,bordered)
			.row
				.row.col-sm-6.col-xs-7.q-pa-md.text-align-left
					.col-12.q-pb-md.text-bold.text-h7 {{ $t(props.row.name) }}
					.col-xs-12.col-sm-shrink.q-pb-md.text-bold {{ `${$f.numberFormat(props.row.capacity)}${$t('personEx')}  ` }} &nbsp;&nbsp;
					.col-xs-12.col-sm-shrink.q-pb-md.text-grey {{ $t('cms.thereIsNoCapacity') }}
					.col-12.q-pb-lg
						q-badge.text-bold.bg-green-1.text-green-4 BED & BREAKFAST
						span.text-grey.text-subtitle2 &nbsp;&nbsp;{{ $t('breakfast') }}
					.col-12
						q-btn(outline,size="sm",style="--border-radious:5px;height:35px",text-color="black")
							q-icon.q-mr-xs(name="las la-phone-volume",color="red")
							span {{ $t('cms.noneImediateReservation') }}
						q-space
				.col-sm-3.col-xs-5.q-pa-md
					t-image.rounded-borders(:src="props.row.image",width="100%",:height="$q.screen.lt.sm?'90px':'150px'")
				.col-sm-3.col-xs-12.q-pa-md.justify-end
					.row
						q-separator(vertical,spaced,inset)
						.row.col-grow.justify-center
							.row.q-pb-md(v-if="$q.screen.lt.sm")
								.row.col-12
									.text-bold {{ $t('cms.priceForXNight',{night:$f.numberFormat(getNightCount())}) }}
									q-space
									.text-bold.text-subtitle1 {{$f.currencyFormat(getTotalRoomPrice(props.row.id),'IRR') }}
								.row.col-12.q-gutter-x-xs(v-if="discountPercent>0")
									q-space
									.text-grey.text-strike {{ $f.currencyFormat(getTotalRoomPrice(props.row.id,true)) }}
									q-badge.text-subtitle2.text-bold.bg-green-1.text-green-7 {{ `${$f.numberFormat(discountPercent)}%` }}
							.q-mb-xl(v-else)
								.row.col-12.justify-center.q-gutter-x-xs(v-if="discountPercent>0")
									.text-grey.text-strike {{ $f.currencyFormat(getTotalRoomPrice(props.row.id,true)) }}
									q-badge.text-subtitle2.text-bold.bg-green-1.text-green-7 {{ `${$f.numberFormat(discountPercent)}%` }}
								span
									.text-bold.text-subtitle1(style="display:inline") {{ $f.currencyFormat(getTotalRoomPrice(props.row.id),'IRR') }}
									| / 
									span.text-subtitle2 {{ `${$f.numberFormat(getNightCount())} ${$t('night')}` }}
							.row.col-12(v-if="hasValidReserveDate()&&hasReserveCapacity()")
								q-btn(size="sm",dense,flat,color="white",:label="$t('cms.changeDate')",text-color="red",icon="la la-calendar-week",@click="$refs.popupDate.show()")
							q-btn.col-12(:disable="!getTotalRoomPrice(props.row.id,true)",:color="hasReserveCapacity()?'red':'white'",:text-color="hasReserveCapacity()?'white':'red'",:label="!hasReserveCapacity()?$t('cms.changeReserveDate'):hasValidReserveDate()?$t('roomReservation'):$t('cms.selectDate')",
								@click="!hasValidReserveDate()?$refs.popupDate.show():reserveRoom(props.row)")
								t-date(dir="rtl", ref="popupDate",utc-value,btnStyle,rangeMode,:model-value="reserveDate",changeDateFormat,
									@utc-value-update="($event)=>{reserveDate=$event;}",:onValueUpdate="updatePrices",hidePast)
q-card.text-align-left.q-mt-md.q-pa-md(flat,bordered,style="line-height: 1.7rem;")
	.text-bold.text-h7.text-red-4 {{`${$t('cms.roomFacilitiesOfHotel',{name:data.name})}`}}
	t-facility-group(:title="`${$t('cms.existBelowFacilitiesInRooms')}`",:facilities="getRoomFacilities(true,true)",:alternativeFacilities="getRoomFacilities(true,false)")
	q-separator(spaced)
	t-facility-group(:title="`${$t('cms.notExistBelowFacilitiesInRooms')}`",:facilities="getRoomFacilities(false,true)",:alternativeFacilities="getRoomFacilities(false,false)",disable)
q-card.text-align-left.q-mt-md.q-pa-md(flat,bordered,style="line-height: 1.7rem;")
	.text-bold.text-h7.text-red-4 {{ `${$t('cms.hotelFacilitiesAndServices',{name:data.name})}` }}
	t-facility-group(:title="`${$t('cms.thisHotelProvideFacilitiesAndServices')}`",:facilities="getHotelFacilities(true,true)",:alternativeFacilities="getHotelFacilities(true,false)")
	q-separator(spaced)
	t-facility-group(:title="`${$t('cms.thisHotelNotProvideFacilitiesAndServices')}`",:facilities="getHotelFacilities(false,true)",:alternativeFacilities="getHotelFacilities(false,false)",:disable="true")
</template>
<style src="./Index.scss" lang="scss"></style>
<style src="../../../css/cms/shared.scss" lang="scss"></style>

<style lang="scss" scoped>
* {
	--button-border-radius: 10px;
	--button-font-size: 16px;
	--button-padding: 10px 16px;
}
</style>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import { TGallery, TDiscount, TDate, SimpleList, TImage } from '@components';
import TFacilityGroup from './components/TFacilityGroup.vue';

export default defineComponent({
	components: { TDiscount, TGallery, TDate, SimpleList, TImage, TFacilityGroup },
	props: { id: Number },
	setup(props: any) {
		const data = ref({} as any);
		const loading = ref({} as any);
		const reserveDate = ref({} as any);
		const discountPercent = ref(0);
		const pagination = ref({
			sortBy: 'desc',
			descending: false,
			page: 1,
			rowsPerPage: 10,
			rowsNumber: 0,
		});
		const $q = useQuasar();
		const router = useRouter();
		const dollar = ref(0);
		$q.loading.show();
		//
		const init = async () => {
			await updateData();
			await updatePrices(Utils.date.dateRangeToDateType(Utils.date.getNow(true), Utils.date.getNow(true, false, 1)));
			preparedRoomTypes();
			dollar.value = await Utils.helper.convertCurrency(1);
			$q.loading.hide();
		};
		//
		const getNightCount = () => Utils.date.getNights(reserveDate.value?.fromDate, reserveDate.value?.toDate, true) as number;
		//
		const hasValidReserveDate = () => Utils.date.isValidDateRangeEx(reserveDate.value);
		//
		const getTotalRoomPrice = (roomTypeId: any, withDiscount = false) =>
			Service.hotel.getTotalRoomPrice(roomTypeId, {
				stats: data.value.stats,
				dateRange: reserveDate.value,
				discount: withDiscount ? discountPercent.value : 0,
			}) * dollar.value;
		//
		const updatePrices = async (dateValue: any) => {
			const stats = await Service.hotel.getRoomTypeStatsEx(dateValue, [props.id]);
			if (!stats) return;
			Service.hotel.fillHotelWithStats(data.value, stats);
		};
		//
		const updateData = async () => {
			loading.value.data = true;
			data.value = (await Service.hotel.getHotel(props.id, `populate=facilities.facility,roomFacilities.facility,gallery`)) as any;
			loading.value.data = false;
		};
		//
		const reserveRoom = async (room: any) => {
			if (!hasValidReserveDate()) return;
			const reserve = await Service.hotel.temporaryReserveHotel({
				hotel: props.id,
				...reserveDate.value,
				services: [
					{
						roomType: { id: room.id },
						count: 1,
						price: Service.hotel.getRoomPrice(room.id, data.value.stats),
						totalPrice: getTotalRoomPrice(room.id, true),
						currencyUnit: 'IRR',
					},
				],
				...(Utils.auth.isAuthenticated() ? { buyer: { person: Utils.auth.getMe()?.person?.id } } : {}),
			});
			if (!reserve) {
				return;
			}
			router.push({
				name: 'Cms.Hotel.Reserve',
				params: { hotelId: props.id, id: reserve.data.id },
				query: { ...reserve.meta },
			});
		};
		//
		const preparedRoomTypes = () => (data.value.roomTypes = Object.values(data.value?.stats));
		//
		onMounted(async () => await init());
		//
		return {
			loading,
			data,
			pagination,
			reserveDate,
			discountPercent,
			visibleRoomMoreSlide: ref(false),
			visibleHotelMoreSlide: ref(false),
			reserveRoom,
			//methods
			updateData,
			updatePrices,
			getNightCount,
			hasValidReserveDate,
			getTotalRoomPrice,
			getHotelFacilities: (isEnabled: boolean, isImportant: boolean) =>
				data.value.facilities?.filter((x: IHotelFacility) => !!x.isEnable == isEnabled && !!x.isImportant == isImportant),
			getRoomFacilities: (isEnabled: boolean, isImportant: boolean) =>
				data.value.roomFacilities?.filter((x: IRoomFacility) => !!x.isEnable == isEnabled && !!x.isImportant == isImportant),
			hasReserveCapacity: () => true,
		};
	},
});
</script>
