<template lang="pug">
div(v-show="!!title") {{ title }}
.row.text-align-justify
	.col-xs-3.col-sm-4.col-md-2(v-for="item in facilities") 
		t-facility(:name="item.facility?.name",:iconName="item.facility?.iconName",:description="item.facility?.info",:disable="disable")
div(v-show="alternativeFacilities?.length")
	span.text-red-8.cursor-pointer(@click="$event=>visibleAlternativeSlide=!visibleAlternativeSlide")
		| {{$t('showMore')}}
		q-icon(:name="`las la-chevron-circle-${visibleAlternativeSlide?'up':'down'}`")
	q-slide-transition(v-show="visibleAlternativeSlide")
		.row
			.col-xs-3.col-sm-4.col-md-2(v-for="item in alternativeFacilities") 
				t-facility(:name="item.facility?.name",:iconName="item.facility?.iconName",:description="item.facility?.description",:disable="disable")
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import TFacility from './TFacility.vue';

export default defineComponent({
	components: { TFacility },
	props: {
		title: String,
		facilities: Array,
		alternativeFacilities: Array,
		disable: Boolean,
	},
	setup() {
		return { visibleAlternativeSlide: ref(false) };
	},
});
</script>
