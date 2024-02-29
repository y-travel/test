<template lang="pug">
q-input(ref="inputRef", v-model="formattedValue")
	template(v-for="(_, slot) of $slots", v-slot:[slot])
		slot(:name="slot")
</template>

<script lang="ts">
import { CurrencyInputOptions, useCurrencyInput } from 'vue-currency-input';
import { watch } from 'vue';
import _isNil from 'lodash/isNil';
export default {
  name: 'QNumberInput',
  props: {
    modelValue: Number,
    options: Object,
    min: Number,
    max: Number,
    isCurrency: Boolean,
    showSymbol: Boolean,
    customSymbol: String,
  },
  watch: {
    max: 'onOptionUpdate',
    min: 'onOptionUpdate',
    customSymbol: 'onOptionUpdate',
  },
  methods: {
    onOptionUpdate() {
      (this as any).setOptions(createOptions((this as any).$props));
    },
  },
  setup(props: any) {
    watch(
      () => props.modelValue,
      (val) => {
        setValue(val);
      }
    );

    let { inputRef, setOptions, formattedValue, setValue } = useCurrencyInput(createOptions(props));
    return {
      inputRef,
      setOptions,
      setValue,
      formattedValue,
    };
  },
};
const createOptions = (props: any) => {
  // generated from https://dm4t2.github.io/vue-currency-input/playground.html, Thanks Stiller
  const defaultOptions = {
    locale: 'fa-IR',
    currency: props.customSymbol ? props.customSymbol : 'IRR', //@TODO should be get from user lang.
    currencyDisplay: props.showSymbol ? 'narrowSymbol' : 'hidden',
    hideCurrencySymbolOnFocus: false,
    hideGroupingSeparatorOnFocus: false,
    hideNegligibleDecimalDigitsOnFocus: false,
    autoDecimalDigits: false,
    autoSign: true,
    useGrouping: props.isCurrency,
    accountingSign: false,
    ...(props.min || props.max ? { valueRange: {} as any } : {}),
  } as CurrencyInputOptions;

  if (defaultOptions.valueRange && !_isNil(props.min)) {
    defaultOptions.valueRange.min = props.min;
  }
  if (defaultOptions.valueRange && !_isNil(props.max)) {
    defaultOptions.valueRange.max = props.max;
  }
  return defaultOptions;
};
</script>
