<template lang="pug">
q-input(v-model="value", lazy-rules, :rules="$rule.required", v-bind="$attrs",:type="inputType")
	template(v-slot:append)
		q-icon.cursor-pointer(v-if="value",name="lar la-times-circle", @click.stop.prevent="value = null")
		q-icon.cursor-pointer(:name="isPassword ? 'lar la-eye-slash' : 'lar la-eye'", @click="isPassword = !isPassword")
	template(v-for="(_, slot) of $slots", v-slot:[slot])
		slot(:name="slot")
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
	props: {
		modelValue: String,
		type: String,
	},
	setup(props: any) {
		const value = ref(props.modelValue);
		const isPassword = ref(props.type == 'password');
		const inputType = ref((props.type as string) ?? 'text');
		watch(isPassword, (x) => (inputType.value = x ? 'password' : 'text'));
		return {
			value,
			isPassword,
			inputType,
		};
	},
});
</script>
