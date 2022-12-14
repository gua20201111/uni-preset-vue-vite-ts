<template>
  <view class="page df fdc">
    <view v-show="maskModel" class="page-mask df fdc aic jcc" @click="clickMask">
      <view class="f40 mb20">科学防疫，谨遵医嘱；</view>
      <view class="f40">如有雷同，纯属巧合；</view>
      <view class="start-text">点击开启平行宇宙</view>
    </view>
    <view class="fs0">
      <navbar>
        <template v-slot:center>
          <view class="f30 ell" style="max-width:150px">假如我阳了</view>
        </template>
      </navbar>
    </view>
    <view class="page-content df fdc">
      <view class="content-title df aic jcc f30">{{title}}</view>
      <scroll-view :scroll-top="scrollTop" scroll-y class="content-view" :style="{height: `calc(100vh - ${navHeight}px - 120rpx - 200rpx)`}">
        <view v-if="!startGame" class="attr-list h1 df fdc">
          <view class="attr-item h1 df aic jcc" :style="{backgroundColor: currentAttribute.includes(item) ? randomcolors[index]: '', color: currentAttribute.includes(item) ? '#fff' : ''}" @click="selectAttribute(item)" v-for="(item, index) in randomAttribute">{{item}}</view>
        </view>
        <view v-else class="something-list">
          <view class="something-item f30 df aic" v-for="(item,index) in daysSomething">
            第{{index + 1}}天&nbsp;{{item.join("，")}}
          </view>
        </view>
      </scroll-view>
      <view class="df aic jcc f30" style="height: 200rpx">
        <view v-if="!startGame" @click="start" class="start-btn df aic jcc">开始</view>
        <view v-else>
          <view v-if="!isEnd" class="df aic jcc">
            <view @click="nextSomething(true)" class="start-btn df aic jcc">下一天</view>
            <view @click="autoplay" class="start-btn df aic jcc ml20">自动</view>
          </view>
          <view v-else class="df aic jcc">
            <view>如有雷同，纯属巧合</view>
            <view @click="replay" class="start-btn df aic jcc ml20">重新游戏</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { attribute, something, colors } from "@/static/data"
import { getArrayRandom } from "@/utils/index"
import { onMounted, ref } from "vue"
import { onShow, onShareAppMessage } from '@dcloudio/uni-app';
import navbar from '@/components/navbar/navbar.vue'
const app = getApp()
const navHeight = ref(app.globalData!.navHeight)
const daysSomething = ref<string[][]>([])
const currentAttribute = ref<string[]>([])
const randomAttribute = ref<string[]>([])
const randomcolors = ref<string[]>([])
function createRandomAttributeAndColor () {
  randomAttribute.value = getArrayRandom(attribute, 10)
  randomcolors.value = getArrayRandom(colors, 10, true)
}
onShow(() => {
  createRandomAttributeAndColor()
})

onShareAppMessage({

})

//mask
const maskModel = ref(true)
function clickMask() {
  maskModel.value = false
}

const title = ref('请选择三个属性！')
function selectAttribute(item: string) {
  let fIndex = currentAttribute.value.findIndex(v => v === item)
  if(fIndex == -1) {
    if(currentAttribute.value.length >= 3) return
    currentAttribute.value.push(item)
  }else {
    currentAttribute.value.splice(fIndex, 1)
  }
}
const startGame = ref(false)
const days = ref(0)
const isEnd = ref(false)
const scrollTop = ref(0)
function start() {
  if(currentAttribute.value.length !== 3) {
    uni.showToast({
      icon: 'none',
      title: '请选择3个属性'
    })
    return
  }
  startGame.value = true
  nextSomething()
}

function nextSomething(isHandle: boolean = false) {
  if(isEnd.value) return
  if(isHandle) clearAutoPlay()
  daysSomething.value.push(getArrayRandom(something[days.value], 2))
  if(!scrollTop.value) {
    scrollTop.value = 999999
  }
  scrollTop.value ++
  days.value ++
  title.value = `第${days.value}天`
  if(days.value >= something.length) {
    isEnd.value = true
    clearAutoPlay()
  }
}

let autoIntval = ref<number | null>(null)
function autoplay() {
  if(autoIntval.value) return
  nextSomething()
  autoIntval.value = setInterval(() => {
    nextSomething()
  }, 500)
}
function clearAutoPlay() {
  if(autoIntval.value) {
    clearInterval(autoIntval.value)
    autoIntval.value = null
  }
}

function replay() {
  createRandomAttributeAndColor()
  startGame.value = false
  days.value = 0
  isEnd.value = false
  scrollTop.value = 0
  title.value = '请选择三个属性！'
  currentAttribute.value = []
  daysSomething.value = []
}


</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
}
.page-mask{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f5;
  box-shadow: 0px 0 40rpx 2rpx #999 inset;
  z-index: 999999999;
}
.start-text{
  margin-top: 600rpx;
  margin-bottom: -300rpx;
  padding: 100rpx;
  color: #999;
  font-size: 44rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
  opacity: 0.6;
}
.start-text:active{
  color: #666;
}
.page-content{
  flex: 1;
  padding: 0 30rpx 30rpx;
  .content-title{
    height: 80rpx;
    border: 1rpx #666 solid;
    border-radius: 14rpx 14rpx 0 0;
    flex-shrink: 0;
    border-bottom: 0;
  }
  .content-view{
    border: 1rpx #666 solid;
    border-radius: 0 0 14rpx 14rpx;
    box-sizing: border-box;
  }
  .start-btn{
    width: 200rpx;
    height: 80rpx;
    background: #eee;
    border-radius: 10rpx;
  }
  .something-item{
    min-height: 80rpx;
    padding: 16rpx;
    margin: 0 20rpx;
    border-top: 1rpx #eee solid;
  }
  &.something-item:first-child{
    border: none;
  }
}
</style>
