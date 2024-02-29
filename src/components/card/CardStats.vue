<template lang="pug">
q-card
	q-card-section.text-center
		span {{title}}
		q-separator
		q-circular-progress.q-ma-md(v-if="maxValue",v-bind:class="{'text-orange-5':(!invalidData),'text-red-5':(invalidData)}",show-value, :value="value",:max="maxValue", size="100px",track-color="grey-3")
			q-spinner-dots(v-if="loading",v-show="true",size="2em")
			.text-bold(v-else) {{$f.currencyFormat(value)}}
		span.text-h4(v-else) {{$f.currencyFormat(value)}}
		

</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardStat',
  props: { title: String, value: Number, maxValue: Number, invalidData: Boolean, loading: Boolean },
  setup(props) {
    return {};
  },
});
</script>
