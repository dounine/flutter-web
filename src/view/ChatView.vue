<template>
  <div class="px-4">
    <div class="navbar bg-base-100 bg-opacity-0 max-w-screen-md mx-auto">
      <div class="navbar-start">
        <button @click="back" class="btn">
          <i class="icon icon-left"></i>
        </button>
      </div>
      <div class="navbar-center">
        <div class="btn btn-ghost normal-case text-lg">
          聊天窗口
        </div>
      </div>
      <div class="navbar-end">
      </div>
    </div>
    <div class="navbar">
      <div class="flex-none">
        <span class="normal-case">表情包</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input type="checkbox" v-model="emoji" class="checkbox"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-none">
        <span class="normal-case">图片</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input type="checkbox" v-model="image" class="checkbox"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-none">
        <span class="normal-case">拍照</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input type="checkbox" v-model="camera" class="checkbox"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-none">
        <span class="normal-case">文件</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input type="checkbox" v-model="file" class="checkbox"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-none">
        <span class="normal-case">收藏</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input type="checkbox" v-model="favorite" class="checkbox"/>
      </div>
    </div>
    <div class="navbar">
      <div class="flex-none">
        <span class="normal-case">位置</span>
      </div>
      <div class="ml-2 flex-1 justify-end">
        <input type="checkbox" v-model="location" class="checkbox"/>
      </div>
    </div>
    <button @click="create" class="btn btn-neutral btn-block btn-circle shadow">
      <i class="icon icon-install text-base"></i>
      创建窗口
    </button>
  </div>
</template>

<script setup>
import {ref, onBeforeMount, getCurrentInstance, reactive} from 'vue'
import sdk from "@/util/sdk.js";

const emoji = ref(false)
const location = ref(false)
const camera = ref(false)
const image = ref(false)
const file = ref(false)
const favorite = ref(false)
const {proxy} = getCurrentInstance()
const create = () => {
  console.log(emoji.value)
  let menus = [];
  if (image.value) {
    menus.push('image')
  }
  if (camera.value) {
    menus.push('camera')
  }
  if (file.value) {
    menus.push('file')
  }
  if (favorite.value) {
    menus.push('favorite')
  }
  if (location.value) {
    menus.push('location')
  }

  sdk.chat.create({
    title: 'Lake', url: 'http://192.168.0.75:8080/#/chat_window',
    emoji: emoji.value,
    menus,
    loading: true
  })
}
const back = () => {
  proxy.$router.back()
}
onBeforeMount(async () => {
})

</script>

<style lang="scss" scoped>
.chatHeadBox {
  padding: 10px 0;

  .chatHead {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
}

.container {
  //height: calc(100vh - 100px);
  width: 100%;
}
</style>
