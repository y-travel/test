<template lang="pug">
.row.justify-center.q-gutter-sm 
		.row.col-12.justify-center.q-pa-sm(style="max-width: 1200px;")
			q-img(src="cms/logo_black.png",style="width: 200px;")
			q-space()
			.self-end
				q-btn(v-if="!$u.auth.isAuthenticated()",outline,rounded,text-color="red",icon="las la-user",:to="{name:'Cms.Home'}",:label="$t('cms.registerOrLogin')")
hr
.row.justify-center
	.col-xs-12.q-gutter-sm(style="padding-bottom:50px;max-width: 1200px;")
		.q-pa-sm
			router-view
</template>
<script lang="ts">
import { defineComponent,onBeforeMount } from 'vue';

import { changeLayoutDirection } from 'utils';

export default defineComponent({
	setup(){
		onBeforeMount(() => {
			changeLayoutDirection('rtl');
		});
	}
}); 
</script>
