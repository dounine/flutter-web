<template>
  <div>
    <div class="fixed top-0 left-0 right-0 navbar bg-base-100 shadow">
      <div class="flex-1">
        <a href="/" class="text-xl">Flutter web sdk</a>
      </div>
      <div class="flex-none">
        <label class="swap swap-rotate mr-2">
          <input type="checkbox" @change="darkChange" v-model="dark"/>
          <svg class="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
          </svg>
          <svg class="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
          </svg>
        </label>
      </div>
    </div>
    <div class="h-20"></div>
    <router-view></router-view>
    <div v-if="hash!=='#/chat_window'" class="btm-nav shadow text-sm max-w-screen-md mx-auto">
      <button @click="navClick('home')"
              v-bind:class="{'text-success font-bold':activeName==='home'}">
        <i class="icon icon-function cursor-pointer text-xl"></i>
        <span class="font-medium">功能列表</span>
      </button>
      <button @click="navClick('about')" :to="{name:'about'}"
              v-bind:class="{'text-success font-bold':activeName==='about'}">
        <i class="icon icon-about cursor-pointer text-xl"></i>
        <span class="font-medium">关于</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import {showToast} from '@nutui/nutui';
import {ref, reactive, onBeforeMount, getCurrentInstance, watch, onMounted} from "vue";
import ClipboardJS from 'clipboard';
import sdk from "@/util/sdk.js";

const {proxy} = getCurrentInstance()
const dark = ref(localStorage.getItem('theme') === 'dark')
const hash = ref(window.location.hash)
let mergeName
let homeList = ['home', 'ipa', 'install']
let checkList = ['check', 'report']
let sourceList = ['source']
let aboutList = ['about', 'deploy', 'token']

const navClick = (name) => {
  proxy.$router.push({name})
}
const darkChange = () => {
  if (dark.value) {
    // document.documentElement.classList.add('dark')
    document.documentElement.attributes['data-theme'].value = 'dark'
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.attributes['data-theme'].value = 'light'
    localStorage.setItem('theme', 'light')
  }
  // console.log(value);
}
const routerInit = () => {
  if (homeList.find(i => {
    return location.hash.startsWith(`#/${i}`)
  }) || location.hash === '#/') {
    mergeName = 'home'
  } else if (checkList.find(i => {
    return location.hash.startsWith(`#/${i}`)
  })) {
    mergeName = 'check'
  } else if (sourceList.find(i => {
    return location.hash.startsWith(`#/${i}`)
  })) {
    mergeName = 'source'
  } else if (aboutList.find(i => {
    return location.hash.startsWith(`#/${i}`)
  })) {
    mergeName = 'about'
  } else {
    mergeName = 'other'
  }
}
routerInit()
const activeName = ref(mergeName)
watch(
    () => proxy.$route.path,
    () => {
      routerInit()
      localStorage.setItem('path', proxy.$route.path)
      activeName.value = mergeName
    }
);
onMounted(async () => {
  await sdk.page.loaded();
})
onBeforeMount(async () => {
  if (dark.value) {
    document.documentElement.attributes['data-theme'].value = 'dark'
  } else {
    document.documentElement.attributes['data-theme'].value = 'light'
  }
  let clipboard = new ClipboardJS('.copy');
  clipboard.on('success', function (e) {
    showToast.success('复制成功')
    e.clearSelection();
  });
  // await queryApi()
  document.body.removeChild(document.getElementById("loading"));
  document.getElementById("app").style.display = "block";
})
</script>
<style lang="scss" scoped>
</style>
