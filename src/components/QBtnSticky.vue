<template lang="pug">
q-page-sticky(:position="$q.screen.lt.sm?'bottom':'bottom-right'",:offset="$q.screen.lt.md?[10,20]:[30,30]")
	.col-1.self-end
		q-btn.float-right(fab,color="amber", text-color="black",:icon="icon",@click="onClick")
			q-tooltip {{$t(tooltip)}}
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QBtnSticky',
  props: {
    onClick: Function,
    icon: String,
    tooltip: String,
  },
  setup() {
    return {};
  },
});
</script>
