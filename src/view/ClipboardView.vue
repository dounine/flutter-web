<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="粘贴板/clipboard">
      <template #left>
        <div>返回</div>
      </template>
      <template #right>
        <ShareN width="16px"></ShareN>
      </template>
    </nut-navbar>
    <nut-input
        v-model="text"
        placeholder="要复制内容"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="clipboard_copy" size="small">clipboard copy</nut-button>
      </template>
    </nut-input>
    <nut-input
        v-model="paste"
        placeholder="粘贴板内容"
        disabled
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="clipboard_paste" size="small">clipboard paste</nut-button>
      </template>
    </nut-input>
  </div>
</template>
<script setup>
import {
  showToast
} from "@nutui/nutui";
import {ref, onBeforeMount, getCurrentInstance, onBeforeUnmount} from "vue";
import sdk from "@/util/sdk.js";

const {proxy} = getCurrentInstance();
const text = ref('')
const paste = ref('')
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const clipboard_copy = async () => {
  let result = await sdk.clipboard_copy({text: text.value})
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    showToast.success('success')
  }
}
const clipboard_paste = async () => {
  let result = await sdk.clipboard_paste({})
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    paste.value = result.data
    showToast.success('success')
  }
}
onBeforeMount(async () => {

});
onBeforeUnmount(async () => {
})
</script>

<style lang="scss" scoped>

</style>
