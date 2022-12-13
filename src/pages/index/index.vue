<template>
  <view class="content">
  </view>
</template>

<script setup lang="ts">
import { attribute, something } from "@/static/data"
import { getArrayRandom } from "@/utils/index"
import { onMounted, ref } from "vue"
import { onShow } from '@dcloudio/uni-app';
const daysSomething = ref<string[]>([])
const currentAttribute = ref<string[]>([])
const randomAttribute = ref<string[][]>([])

function createRandomAttribute () {
  randomAttribute.value = getArrayRandom(attribute, 10)
}

onShow(() => {
  createRandomAttribute()
})
</script>

<style>

</style>
