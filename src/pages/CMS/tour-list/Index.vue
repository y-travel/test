<template lang="pug">
.row
.col-xs-12.col-sm-7.col-md-9.q-px-sm
		simple-list(:title="`${$t('')}`",:rows="data", v-model:pagination="pagination",:loading="loading.hotels",@request="getData", :rows-per-page-options="0",grid,grid-header="false",hide-no-data,hide-pagination)
			template(v-slot:item="props")
				q-card.col-xs-12.col-sm-12.col-md-6.col-lg-4.cursor-pointer.q-px-sm.q-hoverable(v-ripple,flat,:bordered="false")
						router-link.text-black(style="text-decoration:auto;", :title="props.row.name", :to="{name:`Cms.Tours.Detail`,params:{id:props.row.id}}")
							.col-12
								t-image(:src="props.row.image??props.row.template?.image",height="100%",width="100%")
							.col-12.row
								.col-12
									.row.hotel_name.float-left.bg-blue-6(style="padding: 0;width:100%")
											div.col-12.float-left.flex.q-gutter-xs
												.text-yellow-6(style="text-decoration:auto", :title="props.row.name")
													span {{ $s.pkg.getDisplayName(props.row) }}
												q-space
											span(style="text-align: left;width:100%").text-white.font-subtitle2.float-left {{ `${$t('cms.startPriceFrom')} ${$f.currencyFormat(props.row.totalPackagePrice,'IRR')}` }}
											q-card-section.text-align-left()
						.row.flex.justify-between(style="margin-top: 60px; ")
							.col-6(style="margin-bottom:20px;")
											t-image(:src="props.row.image??props.row.template?.image",style="width: 70%;")
												.text-white(style="text-decoration:auto;width:100%;height:70%;bottom:0;", :title="props.row.hotelPlan[0].hotel?.name")
													span {{ props.row.hotelPlan[0].hotel?.name}}
											.flex.justify-evenly(style="width: 100%;")
												div
													span.text-red-6 نجف
												div(style="margin-right:10px;")
													div(dir="rtl") {{ `${$u.date.getNights(props.row.hotelPlan[1]?.dateFrom,props.row.hotelPlan[1]?.dateTo)}` }}
											div(style="margin-left:4rem;")
												q-rating(v-model="star",size="1em",color="orange",readonly)
							.col-6(style="margin-bottom:20px;")
											t-image(:src="props.row.image??props.row.template?.image",style="width: 70%;")
												div.text-white(style="text-decoration:auto;width:100%;height:70%;bottom:0;", :title="props.row.hotelPlan[1].hotel?.name")
													span  {{props.row.hotelPlan[1].hotel?.name}}
											.flex.justify-evenly(style="width: 100%;")
												div
													span.text-red-6 کربلا
												div(style="margin-right:10px;")
													div(dir="rtl") {{ `${$u.date.getNights(props.row.hotelPlan[1]?.dateFrom,props.row.hotelPlan[1]?.dateTo)}` }}
											div(style="margin-left:4rem;")
												q-rating(v-model="star",size="1em",color="orange",readonly)
												q-space
												span.cmsIcon-location-pin.float-left(style="margin-right:1.5rem;")
										
												
</template>

<style lang="scss" src="./Index.scss" scoped="local" />
<style src="../../../css/cms/shared.scss" lang="scss"></style>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import SimpleList from 'components/SimpleList.vue';
import TDiscount from '@components/TDiscount.vue';
import TImage from '@components/TImage.vue';
import translations from './Ioc';
import TPackageSlider from '../home/components/TPackageSlider.vue';

export default defineComponent({
	components: { SimpleList, TDiscount, TImage, TPackageSlider },
	setup() {
		const data = ref([] as any);
		const star = ref(4);
		const loading = ref({} as any);
		const pagination = ref({
			sortBy: 'desc',
			descending: false,
			page: 1,
			rowsPerPage: 10,
			rowsNumber: 0,
		});
		//
		const init = async () => {
			Utils.helper.patchTranslation('hotel-list', translations);
			await getData();
		};
		//
		const getData = async (props = { pagination: pagination.value }, updatePagination = true) => {
			const { rowsPerPage, page } = props.pagination;
			const pageNo = (page - 1) * rowsPerPage;
			loading.value.data = true;
			const reservations = (await Service.pkg.getPackages(
				{ pageNo, rowsPerPage },
				4,
				'sort=createdAt:DESC&populate=departure,return,hotelPlan,hotelPlan.hotel,hotelPlan.hotel.city,hotel.city'
			)) as any;
			if (updatePagination) {
				pagination.value = {
					...props.pagination,
					page: page,
					rowsPerPage: rowsPerPage,
					rowsNumber: reservations.meta.pagination.total,
				};
			}
			data.value = reservations.data;
			loading.value.data = false;
		};

		//
		onMounted(async () => await init());
		//
		return {
			loading,
			data,
			pagination,
			getData,
			star,
		};
	},
});
</script>
