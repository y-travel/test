<template lang="pug">
q-card.text-white(flat,bordered,style="background:radial-gradient(circle, #535C6D 0%, #4C4A4B 100%)")
	q-item
		q-item-section
			.text-weight-medium {{$t(title)}}
	q-separator(dark)
	q-card-section(v-show="type=='count'")
		div(v-for="item in items")
			span(v-if="!item?.type")
				span {{$t(item.name??'none')}} : 
				span {{currencyFormat(item.registered)}} &nbsp
				span {{$t('unitPerson')}}
			q-separator(v-if="item?.type=='separator'",spaced,dark)
	q-card-section(v-show="type=='price'")
		div(v-for="item in items")
			span(v-if="!item?.type")
				|{{$t(item.name??'none')}} : 
				span(v-show="item.originPrice&&item.price!=item.originPrice")
					span.text-strike.text-grey {{isFinite(item.originPrice)?currencyFormat(item.originPrice):item.originPrice}}
					q-badge.text-weight-medium(dir='ltr',rounded,color='red', label='OFF',style='font-size:xx-small',align='middle')
				span {{ isFinite(item.price)?currencyFormat(item.price,'IRR'):item.price}} 
			q-separator(v-if="item?.type=='separator'",spaced,dark)

</template>

<script lang="ts">
import { currencyFormat } from 'utils';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Stats',
  props: {
    type: {
      type: String,
      required: true,
    },
    items: {
      type: [],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props: any, ctx) {
    return {
      currencyFormat,
    };
  },
});
</script>
