<template lang="pug">
.row 
	| {{ $t('hotel-reserve.payment-text') }}
.row
	q-btn(:label="$t('return')",  color="grey",text-color="white",@click="store.gotoDataEntryStep()")
	q-btn(:disable="isNotImediate",:loading="store.loading.payment",:label="$t('payment')", type="submit", color="red",text-color="white")
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../store';

export default defineComponent({
	setup() {
		return {
			store,
			isNotImediate: true,
		};
	},
});
</script>
