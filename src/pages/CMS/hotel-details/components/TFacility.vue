<template lang="pug">
div
	span.facilityIcon.vertical-top(:class="`cmsIcon-${iconName}`")
	span.facilityName {{name}}
	q-icon(name="las la-info-circle",size="xs",v-show="!!description")
		q-tooltip {{description}}
</template>
<style lang="scss" scoped>
.facilityIcon {
	font-size: 24px;
	color: v-bind(iconColor);
}
.facilityName {
	color:v-bind(nameColor) ;
}
</style>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	props: {
		name: String,
		iconName: String,
		description: String,
		disable: Boolean,
	},
	setup(props: any) {
		return { 
			iconColor: ref(props.disable ? '#AAAAAA' : 'red'),nameColor:ref(props.disable?'#AAAAAA':'black') };
	},
});
</script>
