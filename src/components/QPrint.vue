<template lang="pug">
iframe(ref='myframe',v-if="show",v-show="false", :src="link",:onload="onLoadDocument")
q-btn.q-ml-sm(flat,:loading="loading", color="primary", @click="doPrint()", :label="label")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
	link:String,
    label: String,
  } as any,
  setup(props) {
    const show = ref(false);
    const loading = ref(false);
    const myframe = ref({} as any);
    return {
      show,
      loading,
      myframe,
      onLoadDocument: () => {
        myframe.value.contentWindow.focus();
        myframe.value.contentWindow.print();
        loading.value = false;
      },
      doPrint: () => {
        loading.value = true;
        show.value = true;
        myframe.value.src = myframe.value.src; //to force iframe get document again and prevent caching
      },
    };
  },
  methods: {},
});
</script>
