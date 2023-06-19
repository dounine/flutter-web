<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <i @click="backFun" class="icon icon-left text-accent ml-2 cursor-pointer"></i>
    </div>
    <div class="navbar-center">
      <div class="text-sm font-medium">{{ title }}</div>
    </div>
    <div class="navbar-end">
    </div>
  </div>
</template>
<script setup>
import {defineProps} from 'vue'
import {getCurrentInstance} from "vue"

const {proxy} = getCurrentInstance()
const backFun = () => {
  if (props.back) {
    back()
    return
  }
  proxy.$router.back()
}
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  back: {
    type: Function
  }
})
const emit = defineEmits(['back'])
</script>
