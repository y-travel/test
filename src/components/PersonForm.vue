<template lang="pug">
.row

	q-input.col-6.q-px-xs(outlined,dense, v-model="data.name",autofocus, :label="$t('name')", lazy-rules, :rules="$rule.required", maxlength="100",v-bind="$attrs")
	q-input.col-6.q-px-xs(outlined,dense, v-model="data.family", :label="$t('family')", lazy-rules, :rules="$rule.required", maxlength="100",v-bind="$attrs")
.row
	.col-6.q-px-xs
			q-input(outlined,dense, v-model="data.nameEn", :label="$t('nameEn')", lazy-rules, :rules="$rule.required", maxlength="100",v-bind="$attrs")
	.col-6.q-px-xs
		q-input(outlined,dense, v-model="data.familyEn", :label="$t('familyEn')", lazy-rules, :rules="$rule.required", maxlength="100",v-bind="$attrs")
.row
	.col-6.q-px-xs
		q-input(outlined,dense, v-model="data.nationalCode", :label="$t('nationalCode')", mask="##########", fill-mask="#", lazy-rules, :rules="$rule.nationalCode", style="direction: ltr",v-bind="$attrs")
	.col-6.q-px-xs
		q-input(outlined,dense, v-model="data.passportNo", :label="$t('passportNo')",mask="A#########", fill-mask="#", lazy-rules, :rules="$rule.passportNo", style="direction: ltr",v-bind="$attrs")
.row
	.col-xs-12.col-sm-6.q-px-xs
		t-date(utc-value,showGroupAge,hideFuture,:model-value="data.birthDate",@utc-value-update="data.birthDate=$event",:baseDate="baseDate",:label="$t('birthDate')",:rules="$rule.date()",v-bind="$attrs")
	.col-xs-12.col-sm-6.q-px-xs
		t-date(utc-value, :model-value="data.passportExpDate",@utc-value-update="data.passportExpDate=$event",:label="$t('passportExpDate')",:rules="$rule.dateMoreThan(baseExpirePassDate,passportExpDate)",v-bind="$attrs")
.row
	.col-xs-12.col-sm-6.q-px-xs
			q-radio(name="data.sex",v-model="data.sex",size="lg", :val="true", :label="$t('male')",checked-icon="la la-check-circle",unchecked-icon="la la-circle",v-bind="$attrs")
			q-radio(name="data.sex",v-model="data.sex",size="lg", :val="false", :label="$t('female')",checked-icon="la la-check-circle",unchecked-icon="la la-circle",v-bind="$attrs")

</template>
<script lang="ts">
import { defineComponent } from 'vue';

import TDate from '@components/primitive/TDate.vue';

export default defineComponent({
  components: { TDate },
  name: 'PersonForm',
  props: {
    data: Object,
    baseDate: String,
    baseExpirePassDate: String,
  },
  setup() {
    return {
      passportExpDate: 186,
    };
  },
});
</script>
