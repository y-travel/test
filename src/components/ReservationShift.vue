<template lang="pug">
q-dialog(ref="dialogRef",@hide="onDialogHide",persistent)
	q-card(align,style="width:300px")
		q-form(@submit="onSubmit")
			q-card-section
				.row.items-end.q-col-gutter-xs
					q-select.col-12.q-px-xs(filled,dense,clearable,behavior="menu",v-model="data.pkg",:label="$t('packageList')",:loading="loading.packages",
						@filter="(value,update,abort)=>{loading.packages=true;$s.pkg.getPackagesAsync(value,update,abort,(res)=>{packages=res;loading.packages=false;})}"
						:options="packages",:option-value="(opt)=>opt?.id??opt",emit-value,use-input,:option-label="(opt)=>$u.helper.quasarSelectLabel(opt,packages)",@update:model-value="data.pkg=$event",lazy-rules, :rules="$rule.required")
			q-card-section
				.row
					.col-md-12.q-px-xs
						q-btn(:loading="loading.submit",:label="$t('submit')", type="submit", color="primary",flat)
						q-btn.q-ml-sm(:label="$t('cancel')", color="primary", flat,@click="onCancel")
					.col-3
			q-inner-loading(:showing="loading.data")
</template>
<script lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { requestGet, requestUpsert } from 'services';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: '',
  props: {
    id: Number,
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props: any) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const loading = ref({} as any);
    const data = ref({} as any);
    const packages = ref([] as any);
    const reservation = ref({} as any);
    const init = async () => {
      loading.value.data = true;
      reservation.value = (await requestGet(`package-reservations/${props.id}`, 'populate=package')).data; //null value has not been checked to keep form in loading mode
      data.value.pkg = reservation.value.package;
      loading.value.data = false;
    };

    onMounted(async () => await init());
    return {
      data,
      loading,
      packages,
      dialogRef,
      onDialogHide,
      async onSubmit() {
        loading.value.submit = true;
        //do something
        const res = (await requestUpsert('package-reservations/:id/shift', props.id, { pkg: data.value.pkg?.id ?? data.value.pkg })).data;
        if (res) {
          onDialogOK(res);
        }

        loading.value.submit = false;
      },
      onCancel: onDialogCancel,
    };
  },
});
</script>
