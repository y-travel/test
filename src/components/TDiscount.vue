<template lang="pug">
.hotel_details_offer(v-if="type=='vertical'")
	p
		span(itemprop="name") تخفیف تا
	p
		span ٪{{ $f.currencyFormat(percentage) }}
.hotel_discount_group(v-else)
	.discount_percent(:class="status=='Active'?'discount_red':''")
		p تخفیف رزرو تا
		span ٪{{ $f.currencyFormat(percentage) }}
</template>
<style lang="scss">

.hotel_discount_group {
	.discount_percent {
		background: #969696;
		border-radius: 0 4px 4px 0;
		height: 30px;
		overflow: hidden;
		//padding-right: 15px;
		position: relative;
		width: 140px;
		&:after {
			border-bottom: 6px solid #f8f8f8;
			border-left: 7px solid transparent;
			border-right: 7px solid transparent;
			bottom: 0;
			content: '';
			height: 0;
			margin: auto 0;
			position: absolute;
			left: -5px;
			top: 0;
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
			width: 0;
		}
		p {
			color: #fff;
			display: inline-block;
			font-size: 12px;
			line-height: 30px;
			text-align: left;
		}
		span {
			background: #717171;
			color: #fff;
			display: inline-block;
			float: right;
			font-size: 14px;
			height: 100%;
			line-height: 30px;
			text-align: center !important;
			width: 45px;
		}
	}
	.discount_percent.discount_red {
		background: #ff515b;
		span {
			background: #ec424f;
		}
	}
}
.hotel_details_offer {
	display: inline-block;
	background: #ff515b;
	border-radius: 0 0 3px 3px;
	text-decoration: none;
	color: #fff;
	float: right;
	height: 70px;
	margin-left: 15px;
	overflow: hidden;
	position: relative;
	text-align: center;
	width: 65px;
	p {
		margin: 0;
		line-height: 28px;
		text-align: center;
		&:first-child {
			font-size: 13px;
			padding-top: 8px;
		}
		&:last-child {
			background: #ec424b;
			font-size: 17px;
			line-height: 37px;
		}
	}
	&:before {
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;
		border-top: 7px solid #fff;
		content: '';
		height: 0;
		left: 0;
		margin: 0 auto;
		position: absolute;
		right: 0;
		top: 0;
		width: 0;
	}
}
@media only screen and (max-width: 767px) {
	.hotel_details_offer {
		margin-left: 5px;
		height: 78px !important;
		p {
			&:last-child {
				line-height: 45px !important;
			}
		}
	}
}

</style>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
	name: 'TDiscount',
	props: {
		percentage: Number,
		status: String,
		type:String,
	} as any,
	setup(props: any) {
		const init = () => {
		};
		onMounted(() => init());
		return {};
	},
});
</script>
