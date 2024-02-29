<template lang="pug">
.row
	.col-xs-4.col-sm-5.col-md-3.q-px-sm(v-show="$q.screen.gt.xs")
		q-card
			.column
				.q-py-md.text-white.bg-red-12(style="border-radius: 5px 5px 0 0;")
					q-icon(name="las la-filter",size="xs")
					span {{ $t('cms.findInHotels') }}
				.q-pr-md.q-pt-lg.self-start
					span.text-red-12 {{ $t('cms.placeType') }}
				.row.q-pr-sm.text-grey
					.col-6.column
						q-checkbox( v-model="search.hotel1",:label="$t('hotel')",size="sm",color="red",checked-icon="las la-check",unchecked-icon="las la-null",indeterminate-icon="las la-null")
						q-checkbox( v-model="search.disable",:label="$t('hostel')",size="sm",color="grey",disable,indeterminate-icon="las la-null")
						q-checkbox( v-model="search.disable",:label="$t('motel')",size="sm",color="grey",disable,indeterminate-icon="las la-null")
						q-checkbox( v-model="search.disable",:label="$t('apartmentSuit')",size="sm",color="grey",disable,indeterminate-icon="las la-null")
					.col-6.column
						q-checkbox(v-model="search.disable",:label="$t('apartment')",size="sm",color="grey",disable,indeterminate-icon="las la-null")
						q-checkbox(v-model="search.disable",:label="$t('residentialUnit')",size="sm",color="grey",disable,indeterminate-icon="las la-null")
						q-checkbox(v-model="search.disable",:label="$t('inn')",size="sm",color="grey",disable,indeterminate-icon="las la-null")
						q-checkbox(v-model="search.disable",:label="$t('pension')",size="sm",color="grey",disable,indeterminate-icon="las la-null")
				div
					hr.line(style="margin:0")
				.row.items-center
					.col-6
						q-btn(dense,flat,:label="$t('cleanFilter')")
					.col-6
						q-btn(dense,:label="$t('doFilter')",icon="las la-filter",color="red")
	.col-xs-12.col-sm-7.col-md-9.q-px-sm
		q-card.bread_crumb
			.row.q-gutter-x-xs.items-center(style="padding:10px")
				t-discount(v-show="$q.screen.gt.sm",:percentage="29",status="Active")
				span.text-grey-8.header-md {{$t('hotels')}} {{ $t(city) }}
				q-space 
				span.text-subtitle2.text-grey-7 {{ $t('viewType') }}:
				q-btn(padding="xs",color="white",:text-color="searchType=='grid'?'red':'grey'",:glossy="false",:ripple="false",icon="las la-th",@click="$event=>{searchType='grid';getData();}")
				q-btn(padding="xs",color="white",:text-color="searchType=='list'?'red':'grey'",:glossy="false",:ripple="false",icon="las la-bars",@click="$event=>{searchType='list';getData();}")
		hr.line
		simple-list(:title="`${$t('')}`",:rows="data", v-model:pagination="pagination",:loading="loading.hotels",@request="getData", :rows-per-page-options="0",grid,grid-header="false",hide-no-data,hide-pagination)
			template(v-slot:item="props")
				q-card.col-12.q-mb-xl(v-if="searchType=='list'",flat,bordered)
					.row
						q-card-section.col-md-shrink.col-xs-12
							t-image.float-left.hotel_image.rounded-borders(:width="$q.screen.lt.sm?'100%':'265px'",height="150px",:src="props.row.logo")
								span.cmsIcon-eye
						q-card-section.col.col-md.row
							.col-12
								.row.hotel_name.float-left
										div.col-12.float-left.flex.q-gutter-xs
											router-link.text-black(style="text-decoration:auto", :title="props.row.name", :to="{name:`Cms.Hotel.Details`,params:{id:props.row.id}}")
												span {{ props.row.name }}
											q-rating(v-model="props.row.star",size="1em",color="orange",readonly)
										span(style="text-align: right;").text-grey.font-subtitle2.float-left {{ props.row.address }}
							.col-12
								.hotel_feedback.float-right
									.hotel_satisfaction
										p {{ $t('userSatisfaction') }}
										p.hotel_satisfaction_num {{ `${$f.numberFormat(props.row.vote)} ${$t('from')} ${$f.numberFormat(10)}` }}
									t-discount(:percentage="29")
							hr.line.col-12(style="margin-top: 0;")
						.col-12 
							.hotel_box_action
								router-link.text-black(style="text-decoration:auto", :title="props.row.name", :to="{name:`Cms.Hotel.Details`,params:{id:props.row.id}}")
									div
										span.text-white {{ $t('hotel-list.action-box') }}
										q-icon.text-white(name="las la-angle-left")
				q-card.col-xs-12.col-sm-12.col-md-6.col-lg-4.cursor-pointer.q-hoverable(v-else,v-ripple,flat,:bordered="false")
						router-link.row.q-pa-md(:to="{name:`Cms.Hotel.Details`,params:{id:props.row.id}}")
							.col-12
								t-image.float-left.hotel_image_grid.rounded-borders(:width="$q.screen.lt.sm?'100%':'265px'",height="150px",:src="props.row.logo",:defaultImage="$s.img.getDefaultImage('hotel')")
							.col-12.row
								.col-12
									.row.hotel_name.float-left(style="min-width: unset;padding: 0;")
											div.col-12.float-left.flex.q-gutter-xs
												.text-black(style="text-decoration:auto", :title="props.row.name")
													span {{ `${$t('hotel')} ${props.row.name}` }}
												q-space
												q-rating(v-model="props.row.star",size="1em",color="orange",readonly)
											span(style="text-align: right;").text-grey.font-subtitle2.float-left {{ `${$t('cms.startPriceFrom')} ${$f.currencyFormat(0,'IRR')}` }}
</template>
<style lang="scss" src="./Index.scss" scoped="local" />
<style src="../../../css/cms/shared.scss" lang="scss"></style>

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
import { defineComponent, onMounted, ref } from 'vue';

import SimpleList from 'components/SimpleList.vue';
import TDiscount from '@components/TDiscount.vue';
import TImage from '@components/TImage.vue';
import translations from './loc';

export default defineComponent({
	components: { SimpleList, TDiscount, TImage },
	setup() {
		const data = ref([] as any);
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
			Utils.helper.patchTranslation('hotel-list',translations);
			await getData();
		};
		//
		const getData = async (props = { pagination: pagination.value }, updatePagination = true) => {
			const { rowsPerPage, page } = props.pagination;
			const pageNo = (page - 1) * rowsPerPage;
			loading.value.data = true;
			const reservations = (await Service.hotel.getHotels(
				`pagination[start]=${pageNo}&pagination[limit]=${rowsPerPage}&sort=createdAt:DESC&populate=logo`,
				true
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
			fakestar: ref(3),
			city: 'iraq',
			searchType: ref('grid'),
			search: ref({ hotel1: false, disable: undefined }),
		};
	},
});
</script>
