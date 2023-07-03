<template>
  <div class="fixed inset-x-0 inset-y-0 z-50">
    <input type="checkbox" id="my_modal_6" :checked="show" class="modal-toggle hidden"/>
    <div class="h-screen modal">
      <div class="bg-base-100 fixed bottom-0 left-0 right-0 w-screen rounded-t-box">
        <h3 class="font-medium text-center py-3 border-b">{{ title }}</h3>
        <div class="flex justify-center p-5 text-gray-600 text-base">
          {{ text }}
        </div>
        <div class="h-4"></div>
        <div class="flex justify-center">
          <img :src="qrcode" class="w-32 h-32"/>
        </div>
        <div
            class="flex justify-center p-5 items-center break-all break-words">
          <a id="install-link" class="link link-primary text-base underline" :href="link">{{ link }}</a>
          <label class="swap btn-circle swap-rotate">
            <input type="checkbox" class="hidden"/>
            <i class="swap-off icon icon-copy text-2xl copy text-neutral" data-clipboard-target="#install-link"></i>
            <i class="swap-on icon icon-copyed text-2xl copy text-neutral" data-clipboard-target="#install-link"></i>
          </label>
        </div>
      </div>
      <label class="modal-backdrop" @click="onCancelFun" for="my_modal_6">Close</label>
    </div>
  </div>
</template>

<script setup>
import ClipboardJS from "clipboard";

const onCancelFun = () => {
  props.close()
}
const props = defineProps({
  title: {
    type: String,
    default: '请选择安装方式',
  },
  show: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: '选择扫码或者点击链接安装'
  },
  qrcode: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: 'https://ipadump.com'
  },
  close: {
    type: Function
  },
});
let clipboard = new ClipboardJS('.copy');
clipboard.on('success', function (e) {
  e.clearSelection();
});
</script>