<template>
	<view>
		<view
			class="navbar df aic jcb bor-box"
			:style="{
				height: navHeight + 'px',
				'padding-top': statusBarHeight + 'px',
			}"
			:class="{ pof: isFixed }"
		>
			<view class="navbar-left h1 df aic">
				<view
					v-if="hasBack"
					class="back-type0 h1 w1 df aic"
					@click.stop="goBack"
				>
					<image
						src="https://clourd-static.oss-cn-hangzhou.aliyuncs.com/wexin/atjia/left.svg"
					></image>
				</view>
			</view>
			<view class="navbar-center">
				<slot name="center"></slot>
			</view>
			<view class="navbar-right"></view>
		</view>
		<view
			v-if="isFixed"
      class="bor-box"
			:style="{
				height: navHeight + 'px',
				'padding-top': statusBarHeight + 'px',
			}"
		></view>
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref } from "vue";
  import { onShow } from '@dcloudio/uni-app';
	export interface Props {
		hasBack: boolean;
		isFixed: boolean;
	}
	const props = withDefaults(defineProps<Props>(), {
		hasBack: false,
		isFixed: true,
	});
	const app = getApp();
	const rpx = ref(1);
	const navHeight = ref(0);
	const statusBarHeight = ref(0);
	const muneButtonObj = reactive<{
		[key: string]: any;
	}>({});
	const pdleft = ref("0");

	function getMuneButtonData() {
		rpx.value = app.globalData!.rpx;
		navHeight.value = app.globalData!.navHeight;
		statusBarHeight.value = app.globalData!.statusBarHeight;
		let keys = Object.keys(app.globalData!.muneButtonObj);
		keys.forEach((item) => {
			muneButtonObj[item] = app.globalData!.muneButtonObj[item] + "px";
		});
		pdleft.value =
			750 * app.globalData!.rpx - app.globalData!.muneButtonObj.right + "px";
	}

	function goBack() {}

  onShow(() => {
    getMuneButtonData()
  })
</script>

<style lang="scss" scoped>
	.pof {
		position: fixed;
	}
	.navbar {
		top: 0;
		left: 0;
		width: 100%;
		background-color: #f3f3f3;
		z-index: 999;
	}
	.navbar-left,
	.navbar-right {
		width: 120rpx;
	}
	.back-type0 {
		padding-left: 40rpx;
		image {
			display: block;
			width: 36rpx;
			height: 36rpx;
		}
	}
</style>
