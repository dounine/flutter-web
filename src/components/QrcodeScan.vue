<template>
  <nut-action-sheet @click="closeDialog" v-model:visible="dialogVisibled" :title="title">
    <div class="flex justify-center p-5 text-gray-600 text-base">
      {{ text }}
    </div>
    <div class="flex justify-center">
      <nut-image cover :src="qrcode" width="150px" height="150px">
        <template #loading>
          <Loading width="16px" height="16px" name="loading"/>
        </template>
      </nut-image>
    </div>
    <div
        class="flex justify-center p-5 items-center break-all break-words">
      <a id="p12-link" class="text-blue-700 text-sm underline" :href="link">{{ link }}</a>
      <i class="icon icon-copy copy ml-2 text-gray-500 text-lg" data-clipboard-target="#p12-link"></i>
    </div>
    <div class="h-5"></div>
  </nut-action-sheet>
</template>

<script setup>
import {Loading} from '@nutui/icons-vue'
import {ref} from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '请选择安装方式',
  },
  text: {
    type: String,
    default: '可扫码安装、或者点击链接安装'
  },
  qrcode: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
});
const dialogVisibled = ref(true)
const closeDialog = () => {
  dialogVisibled.value = false
}
</script>