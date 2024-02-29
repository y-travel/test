<template lang="pug">
q-chip.col-auto(v-bind:class="{'truncate-chip-labels':true,'col-auto':true}",clickable ,outline ,:loading="true",
	,square,:color="passenger.sex?'teal':'orange'",:label="`${getFullName(passenger)}`", text-color="white", :icon="isInfant(passenger)?'la la-baby':passenger.sex?'la la-male':'la la-female'",v-bind="$attrs")
		q-icon(v-if="!hasBedService(passenger)",size="xs",color="red",name="las la-ban")
		q-spinner-dots(v-show="loadingIcon",size="2em")
		q-tooltip {{`${getFullName(passenger)}`}}
</template>
<style lang="sass" scoped>
@media (max-width: $breakpoint-xs-max)
	.truncate-chip-labels
		width: 300px
@media (min-width: $breakpoint-sm-min)
	.truncate-chip-labels
		max-width: 140px

</style>
<script lang="ts">
import { getFullName, hasBedService, isInfant } from 'src/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    passenger: Object,
    loadingIcon: Boolean,
  },
  setup(props) {
    return {
      getFullName,
      isInfant,
      hasBedService,
    };
  },
});
</script>
