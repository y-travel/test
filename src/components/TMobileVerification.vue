<template lang="pug">
q-dialog(ref="dialogRef",@hide="onDialogHide",persistent,:position="$q.screen.lt.sm?'bottom':'standard'")
	q-card(align,,style="width:300px")
		q-form(@submit="isSendInProgress?onSubmit():onCancel()")
			q-card-section.row.justify-center
				span {{ $t('cms.plzEnterVerificationCode') }}
			q-card-section.row.reverse
				q-input.col.q-mx-sm(v-for="(btn,index) in code", v-model="code[index]",dense,input-class="inputVerifyCode",placeholder="#",mask="#",
									:autofocus="!index",ref="btns",@update:model-value="$refs.btns[index+1]?.focus()",@focus="$refs.btns[index].select()")
			q-card-section.row.justify-center.q-pa-none
				.text-blue-4(v-show="isSendInProgress") {{ displayCountDownTimer }}
				q-btn(v-show="!isSendInProgress",:label="$t('retry')",@click="onReset",flat,color="primary",icon="las la-undo-alt")
			q-card-section
				.row
					q-btn.col-12(:loading="loading.submit",:label="$t(isSendInProgress?'sendCode':'close')", type="submit", :color="isSendInProgress?'green':'red'",:icon="isSendInProgress?'las la-upload':''")
			q-inner-loading(:showing="loading.code")
			
</template>
<style lang="scss">
.inputVerifyCode {
	text-align: center;
	font-size: x-large;
}
</style>
<script lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { defineComponent, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { CountDownTimer } from 'services/timerService';

export default defineComponent({
	name: 'TMobileVerification',
	props: {
		mobileNo: String,
		createIfNotExist: Boolean,
		person: Object,
	},
	emits: [...useDialogPluginComponent.emits],
	setup(props: any) {
		const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
		const loading = ref({} as any);
		const code = ref();
		const timer = new CountDownTimer((duration, val) => {
			isSendInProgress.value = !!duration;
			displayCountDownTimer.value = val;
		});
		const displayCountDownTimer = ref('' as any);
		const isSendInProgress = ref(false);
		const $q = useQuasar();
		//
		const init = async () => {
			await verifyMobileNumber();
		};
		//
		const verifyMobileNumber = async () => {
			loading.value.code = true;
			const res = (
				await Service.api.requestUpsert(
					'people/sms',
					undefined,
					{ mobileNo: props.mobileNo },
					{ noAuth: true, defaultNotify: { notify: true, failedMessage: 'msg.errorDuringSendingSMS' } }
				)
			)?.data;
			if (res?.status == 'valid' || res?.status == 'mock') {
				timer.startTimer(Math.floor(Math.abs(res.waitingTime - Date.now()) / 1000));
			}
			loading.value.code = false;
		};
		//
		const resetCode = () => (code.value = ['', '', '', '']);
		//
		onMounted(async () => await init());
		//
		onBeforeMount(() => resetCode());
		//
		onUnmounted(() => timer.stopTimer());
		//
		return {
			loading,
			code,
			dialogRef,
			onDialogHide,
			displayCountDownTimer,
			isSendInProgress,
			async onReset() {
				resetCode();
				await verifyMobileNumber();
			},
			async onSubmit() {
				loading.value.submit = true;
				const errorMessage = await Utils.auth.login({
					mobileNo: props.mobileNo,
					smsToken: code.value.reduce((sum: any, x: any) => (sum += x), ''),
					createIfNotExist: props.createIfNotExist,
					person: props.person,
				});
				if (!!errorMessage) {
					$q.notify({ type: 'negative', message: errorMessage });
				} else {
					onDialogOK(code);
				}
				loading.value.submit = false;
			},
			onCancel: onDialogCancel,
		};
	},
});
</script>
