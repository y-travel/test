<template lang="pug">
q-form(@submit="onSubmit")
	.col-12
	.header-xl {{ $t('registererInfo') }}
	div(v-if="!$u.auth.isAuthenticated()||$u.auth.isSuperAgency()")
		.row
			q-input.col-6.q-px-xs(outlined,dense,v-model="store.registerer.person.name",:label="$t('name')",lazy-rules, :rules="$rule.required")
			q-input.col-6.q-px-xs(outlined,dense,v-model="store.registerer.person.family",:label="$t('family')",lazy-rules, :rules="$rule.required")
			q-input.col-6.q-px-xs(outlined,dense,v-model="store.registerer.person.mobileNo", :label="$t('mobileNo')",mask="###########",lazy-rules, :rules="[...$rule.mobileNo,...$rule.required]", style="direction: ltr")
			q-input.col-6.q-px-xs(outlined,dense,v-model="store.registerer.person.nationalCode",:label="$t('nationalCode')",mask="##########",lazy-rules, :rules="$rule.required")
	.header-xl {{ $t('roomHeadInfo') }}
	div(v-for="(item,index) in store.reserve.services")
		.row.items-center
			span {{ `${$t('suite')}${$f.numberFormat(index+1)}: ` }}
				span.header-md {{ $t(item.roomType?.name??'') }}
			q-separator.col-grow.q-ma-md(spaced)
			q-icon(v-if="store.reserve.services.count>1",size="sm",name="las la-trash",color="red")
		q-card.col-12(flat)
			q-card-section
				.col-12
					q-checkbox(v-model="store.isHeadEqualReservator",:label="$t('cms.reservatorIsTheSameAsHead')")
				.col-12
					span.col-12 {{ $t('cms.isThereForeignGuestPresentInThisRoom') }}
					q-btn-toggle(v-model="store.hasForeignGuest",outline, no-caps, rounded, unelevated, toggle-color="red", color="white", text-color="grey",
						:options="store.getForeignCountryClass(true)")
				//@TODO add extra guest field
			q-card-section
				.row.col-12
					q-input.col-6.q-px-xs(outlined,dense,v-model="item.recipient.name",:label="$t('name')",:disable="store.isHeadEqualReservator", :placeholder="store.isHeadEqualReservator?store.registerer.person.name:undefined",:stack-label="store.isHeadEqualReservator",lazy-rules, :rules="store.isHeadEqualReservator?undefined:$rule.required")
					q-input.col-6.q-px-xs(outlined,dense,v-model="item.recipient.family",:label="$t('family')",:disable="store.isHeadEqualReservator",:placeholder="store.isHeadEqualReservator?store.registerer.person.family:undefined",:stack-label="store.isHeadEqualReservator",lazy-rules, :rules="store.isHeadEqualReservator?undefined:$rule.required")
	div
		q-checkbox(v-model="store.isAcceptedRules",:label="$t('cms.imAgreeWithHotelReservationRule')")
	div
		q-btn.col-12(:disable="!store.isAcceptedRules",:loading="store.loading.submit",:label="$t('submitAndContinue')", type="submit", color="red",text-color="white")

</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';

import TMobileVerification from '@components/TMobileVerification.vue';
import { store } from '../store';

export default defineComponent({
	components: { TMobileVerification },
	emits: [...useDialogPluginComponent.emits],

	setup() {
		const $q = useQuasar();

		//
		const onSubmit = async () => {
			store.loading.submit = true;
			for (const roomReserve of store.reserve.services) {
				if (store.isHeadEqualReservator) {
					roomReserve.recipient = store.registerer.person;
				}
			}
			if (!Utils.auth.isAuthenticated()) {
				$q.dialog({
					component: TMobileVerification,
					componentProps: {
						mobileNo: store.registerer.person?.mobileNo,
						createIfNotExist: true,
						person: store.registerer.person,
					},
				}).onOk(async () => {
					store.loading.submit = true;
					await store.gotoPaymentPage();
					store.loading.submit = false;
				});
			} else {
				await store.gotoPaymentPage();
			}
			store.loading.submit = false;
		};

		return {
			store,
			onSubmit,
		};
	},
});
</script>
