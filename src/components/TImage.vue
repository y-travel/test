<template lang="pug">
q-img(:src="`${baseAddress??''}${(showLarge?$s.img.getImage(src):$s.img.getThumbnail(src))??getDefaultImage()}`",:width="`${width?width:'150px'}`",:height="height?String(height):'auto'",:img-style="height?{height:String(height)}:{height:'auto'}",fit="fill",v-bind="$attrs")
	.dark-back.absolute-bottom.text-subtitle2(v-if="!!caption")
		q-icon(size="sm",:name="captionIcon")
		span {{`${caption}`}}
	template(v-slot:error)
		q-img(:src="getDefaultImage()",style="position:relative",:width="`${width?width:'150px'}`",:height="height?String(height):'auto'",:img-style="height?{height:String(height)}:{height:'auto'}",fit="fill",v-bind="$attrs")
			.dark-back.absolute-bottom.text-subtitle2(v-if="!!caption")
				q-icon(size="sm",:name="captionIcon")
				span {{`${caption}`}}
	template(v-for="(_, slot) of $slots", v-slot:[slot])
		slot(:name="slot")
</template>
<style lang="scss" scoped>
.dark-back {
	background: rgba(0, 0, 0, 0.6);
}
</style>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'TImage',
	props: {
		src: {
			type: Object,
			required: true,
		},
		width: String,
		height: String,
		caption: String,
		captionIcon: String,
		baseAddress: String,
		defaultImage: String,
		showLarge: Boolean,
	},
	setup(props) {
		return { getDefaultImage: () => props.defaultImage ?? Service.img.getDefaultImage('noImage') };
	},
});
</script>
