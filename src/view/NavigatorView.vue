<template>
  <div class="w-full px-4 pb-20">
    <Navbar title="导航/navigator"></Navbar>
    <div class="navbar">
      <div class="flex-1">
        <span class="normal-case">标题</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input v-model="title" type="text" placeholder=""
               class="input input-bordered border-neutral-content w-full max-w-xs text-right bg-opacity-40"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-1">
        <span class="normal-case">链接</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input v-model="url" type="text" placeholder=""
               class="input input-bordered border-neutral-content w-full max-w-xs text-right bg-opacity-40"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-1">
        <span class="normal-case">手动控制Loading</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input v-model="loading" type="checkbox"
               class="checkbox"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-1">
        <span class="normal-case">背景颜色</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input v-model="bgColor" type="text" placeholder="#99CCFF"
               class="input input-bordered border-neutral-content w-full max-w-xs text-right bg-opacity-40"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-1">
        <span class="normal-case">导航栏背景</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input v-model="appBarColor" type="text" placeholder="#99CCFF"
               class="input input-bordered border-neutral-content w-full max-w-xs text-right bg-opacity-40"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-1">
        <span class="normal-case">导航栏阴影</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input v-model="elevation" type="text" placeholder="0.01"
               class="input input-bordered border-neutral-content w-full max-w-xs text-right bg-opacity-40"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-1">
        <span class="normal-case">加载中颜色</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input v-model="loadingColor" type="text" placeholder=""
               class="input input-bordered border-neutral-content w-full max-w-xs text-right bg-opacity-40"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-1">
        <span class="normal-case">小程序弹窗</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input v-model="miniAnimation" type="checkbox"
               class="checkbox"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-1">
        <span class="normal-case">小程序关闭按钮</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input v-model="miniIcon" type="checkbox"
               class="checkbox"/>
      </div>
    </div>
    <button @click="push" class="btn btn-neutral btn-block btn-circle shadow mt-2">
      <i class="icon icon-install text-base"></i>
      创建新导航
    </button>
    <button @click="pushAndRemoveUntil" class="btn btn-info btn-block btn-circle shadow mt-2">
      <i class="icon icon-install text-base"></i>
      关闭其它导航并创建新导航
    </button>
    <button @click="pushReplacement" class="btn btn-warning btn-block btn-circle shadow mt-2">
      <i class="icon icon-install text-base"></i>
      关闭当前导航并创建新导航
    </button>
    <button @click="pop" class="btn btn-error btn-block btn-circle shadow mt-2">
      <i class="icon icon-install text-base"></i>
      关闭当前导航
    </button>
  </div>
</template>
<script setup>
import {ref, onBeforeMount, getCurrentInstance, onBeforeUnmount} from "vue";
import sdk from "@/util/sdk.js";

const {proxy} = getCurrentInstance();
const title = ref('')
const loading = ref(false)
const url = ref('https://baidu.com')
const miniAnimation = ref(false)
const miniIcon = ref(false)
const bgColor = ref('#FFFFFF')
const appBarColor = ref('#ECEDEC')
const elevation = ref('0.01')
const loadingColor = ref('#5370EA')
const push = async () => {
  await sdk.navigator.push({
    appBar: {
      title: title.value,
      miniIcon: miniIcon.value,
      bgColor: appBarColor.value,
      elevation: parseFloat(elevation.value),
      backShow: true,
      backClose: true,
      moreShow: true,
      loadingShow: false
    },
    bottomSafeArea: {
      safeHeight: true,
      bgColor: '#FFFFFF',
      bgOpacity: 0.99
    },
    url: url.value,
    miniAnimation: miniAnimation.value,
    bgColor: bgColor.value,
    loadingColor: loadingColor.value,
    loading: loading.value
  })
}
const pushAndRemoveUntil = async () => {

}
const pushReplacement = async () => {

}
const pop = async () => {

}
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
</script>

<style lang="scss" scoped>

</style>
