<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <div>
      <div class="bg-white dark:bg-slate dark:text-slate-500 top-0 w-screen sticky text-blue-600 z-40">
        <div class="flex flex-col mt-0 p-0">
          <div class="flex flex-row">
            <div class="flex flex-1 p-4">
              <a href="/" class="flex content-center items-center no-underline font-medium">
                <span class="text-base ml-1">Flutter web sdk</span>
              </a>
            </div>
            <div class="flex items-center pr-2">
              <nut-checkbox @change="darkChange" v-model="darkTheme">
                <template #icon>
                  <div class="flex flex-row items-center text-slate-200 text-sm cursor-pointer hover:text-blue-400">
                    <i class="icon icon-light"></i>
                    <span class="ml-0.5">浅色</span>
                  </div>
                </template>
                <template #checkedIcon>
                  <div class="flex flex-row items-center text-slate-800 cursor-pointer hover:text-blue-400">
                    <i class="icon icon-dark text-base"></i>
                    <span class="text-sm ml-0.5">深色</span>
                  </div>
                </template>
              </nut-checkbox>
            </div>
          </div>
          <div class="h-px bg-gray-100 dark:bg-gray-500">
          </div>
        </div>
      </div>
      <router-view></router-view>
      <nut-tabbar bottom v-model="activeName">
        <nut-tabbar-item tab-title="功能列表" :to="{name:'home'}" name="home">
          <template #icon>
            <i class="icon icon-function cursor-pointer hover:text-blue-400"></i>
          </template>
        </nut-tabbar-item>
        <nut-tabbar-item tab-title="关于" :to="{name:'about'}" name="about">
          <template #icon>
            <i class="icon icon-about cursor-pointer hover:text-blue-400"></i>
          </template>
        </nut-tabbar-item>
      </nut-tabbar>
    </div>
  </nut-config-provider>
</template>
<script setup>
import {showDialog, showToast} from '@nutui/nutui';
import {ref, reactive, onBeforeMount, getCurrentInstance, watch} from "vue";
import ClipboardJS from 'clipboard';

const {proxy} = getCurrentInstance()
const theme = ref('light')
const darkTheme = ref(theme.value === 'dark')
const themeVars = reactive({
  formItemBodyInputTextAlign: 'right',
})

let mergeName
let homeList = ['home', 'ipa', 'install']
let checkList = ['check', 'report']
let sourceList = ['source']
let aboutList = ['about', 'deploy', 'token']

const darkChange = (value) => {
  if (value) {
    theme.value = 'light'
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  } else {
    theme.value = 'dark'
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }
  console.log(value);
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
      activeName.value = mergeName
    }
);
const online = async () => {
  let res = await proxy.axios.get('/sign/online')
  if (res.data.code === 0) {
    count.value = res.data.data.count
  }
}
const token = async () => {
  let result = await proxy.axios.get('/sign/token')
  if (result.data.code !== 0) {
    showDialog({
      title: '授权提示',
      content: `请授权后再使用`,
      onOk: async () => {
        proxy.$router.push({name: 'token'})
      }
    })
  }
}
let defaultApi = import.meta.env.VITE_API_HOST
const queryApi = async () => {
  try {
    if (window.location.host === 'sign.ipadump.com') {
      // let ipRes = await proxy.axios.get('/url/ip')
      // let ip = ''
      // if (ipRes.data.code === 0) {
      //   ip = ipRes.data.data.ip
      // }
      // let ipNumber = parseInt(ip.replace(/[.]/g, ''))
      let result = await proxy.axios.get('https://sign.ipadump.com/apis.json')
      if (result.data.code === 0) {
        let apis = result.data.data.apis
        //创建length长度之内的随机数
        let ipNumber = Math.floor(Math.random() * apis.length)
        let api = apis[ipNumber]
        localStorage.setItem('api', api)
        return
      }
    }
    localStorage.setItem('api', defaultApi)
  } catch (e) {
    console.log(e)
    localStorage.setItem('api', defaultApi)
  }
}
onBeforeMount(async () => {
  // if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark')
    darkTheme.value = false
    theme.value = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    darkTheme.value = true
    theme.value = 'light'
  }
  let clipboard = new ClipboardJS('.copy');
  clipboard.on('success', function (e) {
    showToast.success('复制成功')
    e.clearSelection();
  });
  // await queryApi()
  document.body.removeChild(document.getElementById("loading"));
  document.getElementById("app").style.display = "block";
  await Promise.all([token(), online()])
})
</script>
<style lang="scss" scoped>
</style>
