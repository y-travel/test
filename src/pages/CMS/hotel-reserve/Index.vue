<template lang="pug">
.row
	q-stepper.col-12.col-sm-8.q-pa-xs(v-model="store.step",flat,:header-class="$q.screen.lt.sm?'narrow-step-header':''",alternative-labels,ref="stepper",active-color="red",done-color="green", color="primary", animated)
		q-step(:name="1", :title="$t('dataEntry')", icon="la la-user-edit", :done="store.step > 1")
			t-data-entry-step
		q-step(:name="2", :title="$t('payment')", icon="las la-credit-card", :done="store.step > 2")
			t-payment-step
		q-step(:name="3", :title="$t('getVoucher')", icon="las la-file-invoice", :done="store.step > 3")
			t-voucher-step
	.col-12.col-sm-4.q-pa-xs(:class="$q.screen.lt.sm?'order-first':''")
		q-card(flat,bordered, outlined)
			q-card-section
				.header-md.q-py-sm {{ store.hotel.name }}
				q-separator(spaced)
				.row.q-py-sm
					.col-5.column
						span.text-grey-8.text-subtitle2 {{ $t('entranceDate') }}
						span {{$u.date.getShortFormattedDate(store.reserve.fromDate,!$q.screen.lt.sm) }}
					.col
					.col-5.column
						span.text-grey-8.text-subtitle2 {{ $t('residentDate') }}
						span {{`${getNights()} (${$u.date.getShortFormattedDate(store.reserve.toDate,!$q.screen.lt.sm)})`}}
				q-separator(spaced)
				.row.q-py-sm
					.col-5.column
						span.text-subtitle2 {{ $t('cms.hotelPriceForOneNight',{night:getNights()}) }}
						span.text-orange-5 {{ `${store.getForeignCountryClass(false).label}`}}
					.col
					.col-5.column
						span {{$f.currencyFormat(getTotalPrice(),'IRR')  }}
				.row.q-py-sm
					.col-5.column(v-for="(room,index) in getRooms()")
						span.text-grey-8.text-subtitle2 {{ `${$t('room')}${index}` }}
						span.text-subtitle {{ room.name }}
	q-inner-loading(:showing="store.loading.data")
</template>
<style src="../../../css/cms/shared.scss" lang="scss"></style>
<style lang="scss">
* {
	--button-border-radius: 10px;
}
.narrow-step-header {
	.q-stepper__tab {
		padding: 10px 10px;
	}
}
</style>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

import TDataEntryStep from './component/TDataEntryStep.vue';
import TPaymentStep from './component/TPaymentStep.vue';
import TVoucherStep from './component/TVoucherStep.vue';
import translations from './loc';
import { store } from './store';
import { useQuasar } from 'quasar';

export default defineComponent({
	name: '',
	components: { TPaymentStep, TVoucherStep, TDataEntryStep },
	props: {
		hotelId: Number,
		id: Number, //hotel reservation id
		attr: {},
	},
	setup(props: any) {
		const mockReserve = { services: [{ recipient: {} }] };
		const query = useRouter().currentRoute.value.query as any;
		const $q = useQuasar();
		store.reserve = props.attr ?? mockReserve;
		//
		onBeforeMount(async () => await init());
		//
		const init = async () => {
			store.loading.data = true;
			Utils.helper.patchTranslation('hotel-reserve', translations);
			const res = await store.getData(props.hotelId, props.id, query['token']);
			if (!res) store.loading.data = false;
		};
		//
		const getTotalPrice = () => store.reserve.services?.reduce((sum: number, x: any) => (sum += parseInt(x.totalPrice)), 0);
		//

		return {
			store,
			getRooms: () => store.reserve?.roomReservations,
			getNights: () => Utils.date.getNights(store.reserve.fromDate, store.reserve.toDate),
			getTotalPrice,
		};
	},
});
</script>
