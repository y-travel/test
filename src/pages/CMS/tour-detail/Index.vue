<template lang="pug">
q-card
	q-card-section
		.row
			.col-xs-12.col-sm-5.column.q-gutter-y-md
				q-card.card-stats(flat,bordered)
					.row.q-pa-md.q-gutter-x-xs
						.col
							| {{ $t('name') }}
							h5.text-red {{data.name}}
						.col
							| {{ $t('capacity') }}
							h5.text-red {{$f.numberFormat(data.capacity)}}
						.col
							| {{ $t('startDate') }}
							h5.text-red {{`${$f.timeFormat(data.startDate)}`}}
						.col
							| {{ $t('endDate') }}
							h5.text-red {{`${$f.timeFormat(data.endDate)}`}}
				q-scroll-area(style="min-height: 200px;line-height: 1.7rem;")
					div(style="text-align: justify;",v-html="data.description")
			.col-xs-12.col-sm-7
				.q-pa-sm
					t-gallery(:images="data.image??data.template?.image",:defaultImage="$s.img.getDefaultImage('hotel')")
q-card.q-mt-md.q-pa-md.bg-red-1(flat,style="line-height: 1.7rem;")
	.text-red.text-align-left {{ `${$t('cms.importantNotes')} ${data.name}` }}
	.text-align-justify(v-html="data.notes")

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

import { TGallery } from '@components';

export default defineComponent({
	components: { TGallery },
	props: { id: Number },
	setup(props: any) {
		const data = ref({} as any);
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
			await getData();
		};
		//
		const getData = async () => {
			loading.value.data = true;
			data.value = (await Service.pkg.getPackage(
				props.id,
				`populate=departure,return,hotelPlan,hotelPlan.hotel,hotelPlan.hotel.city,hotel.city`
			)) as any;
			loading.value.data = false;
		};
		//
		onMounted(async () => await init());
		//
		return {
			loading,
			data,
			pagination,
		};
	},
});
</script>
