<template lang="pug">
q-btn(v-for="(item) in items?.filter(x=>x.canShow?x.canShow(...params):true)",:text-color="item.color??'black'", :size="item.size??'sm'", round, dense
	, @click.stop="item.onClick?item.onClick(...params):undefined", :icon="item.icon",:disable="typeof(item.disable)=='function'?item.disable(...params):item.disable"
	,:href="item.getLink?item.getLink(...params):undefined",target="_blank")
		q-tooltip {{$t(item.name)}}
</template>
<style scoped>
.q-btn.disabled {
	color:lightgrey !important;
}
</style>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QToolbar',
  props: {
    items: Object,
	params:Object,
  },

  setup() {

    return {
    };
  },
});
</script>
