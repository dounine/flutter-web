<template>
  <div class="w-full px-4 pb-20">
    <Navbar title="小程序/mini_program"></Navbar>
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
        <input v-model="bgColor" type="text" placeholder="#FFFFFF"
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
    <button @click="push" class="btn btn-neutral btn-block btn-circle shadow mt-2">
      <i class="icon icon-install text-base"></i>
      push新小程序
    </button>
    <button @click="pushAndRemoveUntil" class="btn btn-info btn-block btn-circle shadow mt-2">
      <i class="icon icon-install text-base"></i>
      关闭其它导航并创建新小程序
    </button>
    <button @click="pushReplacement" class="btn btn-warning btn-block btn-circle shadow mt-2">
      <i class="icon icon-install text-base"></i>
      关闭当前导航并创建新小程序
    </button>
    <button @click="pop" class="btn btn-error btn-block btn-circle shadow mt-2">
      <i class="icon icon-install text-base"></i>
      关闭当前小程序
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
const bgColor = ref('#FFFFFF')
const appBarColor = ref('#ECEDEC')
const elevation = ref('0.01')
const loadingColor = ref('#5370EA')
const push = async () => {
  await sdk.mini_program.push({
    appBar: {
      title: title.value,
      bgColor: appBarColor.value,
      elevation: parseFloat(elevation.value),
      showSetting: false,
      showClose: true,
      showBack: false,
      showHome: false,
      closePop: true,
      safeArea: {
        safeHeight: true,
        bgColor: '#FFFFFF',
        appBarHeight: false,
        bgOpacity: 0.99
      }
    },
    bottomSafeArea: {
      safeHeight: true,
      bgColor: '#FFFFFF',
      bgOpacity: 0.99
    },
    url: url.value,
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
