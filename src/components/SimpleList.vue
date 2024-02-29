<template lang="pug">
q-table(row-key="index",flat,:grid="$q.screen.lt.sm",:grid-header="!($q.screen.lt.sm)", :rows-per-page-options="[5,10, 20]",v-bind="$attrs")
	template(v-slot:header="props")
		q-tr(:props="props")
			q-th.text-grey(v-if="($attrs.selection??'none')!='none'",auto-width)
			q-th.text-grey(auto-width)  #
			q-th.text-grey(v-for="col in filterColumns(props.cols)", :key="col.name", :props="props") 
				b {{$t(col.name) }}
			q-th(auto-width)
	template(v-slot:body="props")
		q-tr(:props="props",@click.stop="onRowClick?onRowClick(props.row):()=>{}",style="cursor:pointer;")
			q-td(v-if="($attrs.selection??'none')!='none'",auto-width)
				q-checkbox(v-model="props.selected")
			q-td(auto-width)
				| {{props.rowIndex+1}}
			q-td(v-for="col in filterColumns(props.cols)", :key="col.name", :props="props") 
				div(:class="col.class?col.class(props.row):''")
					span(v-if="!col.isEditable") {{ col.value }}
					q-checkbox(v-else-if="col.type=='boolean'",v-model="props.row[col.field]")
					q-number-input(v-else-if="col.type=='currency'",outlined,dense,v-model="props.row[col.field]",lazy-rules, :rules="$rule.required",isCurrency,min="0")
			q-td(auto-width,@click.stop.prevent="true")
				q-toolbar(:items="toolbarItems",:params="[props.row]")
	template(v-slot:item="props")
		.col-12.q-pa-xs
			q-intersection(:key="props.rowIndex",transition="scale",:once="true")
				q-card.cursor-pointer.q-hoverable(v-ripple,@click="onRowClick?onRowClick(props.row):()=>{}")
					.row
						q-checkbox(v-if="($attrs.selection??'none')!='none'",v-model="props.selected")
						q-card-section.col-auto.row.q-col-gutter-sm
							div(v-for="(item) in filterColumns(props.cols)",:class="item.class?item.class(props.row):''") 
								span.text-grey {{`${$t(item?.name)} : ` }}
								span {{item?.value}}
						q-space
						q-card-section
							q-toolbar(:items="toolbarItems",:params="[props.row]")
	template(v-for="(_, slot) of $slots", v-slot:[slot]="scope")
		slot(:name="slot",v-bind="scope") 

</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

import QToolbar from './QToolbar.vue';
import QNumberInput from './QNumberInput.vue';

export default defineComponent({
  name: 'SimpleList',
  props: {
    onRowClick: Function,
    toolbarItems: Object,
  },
  components: { QToolbar, QNumberInput },
  setup(props: any) {
    const inputRef = ref();

    return {
      inputRef,
      filterColumns: (cols: any[]) => cols.filter((x) => (x.canShow ? x.canShow() : true)),
    };
  },
});
</script>
