<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="扫码/scan">
      <template #left>
        <div>返回</div>
      </template>
    </nut-navbar>
    <nut-input
        v-model="qrcodeContent"
        placeholder="识别内容"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="scan_qrcode" size="small">二维码识别</nut-button>
      </template>
    </nut-input>
    <nut-input
        v-model="brcodeContent"
        placeholder="识别内容"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="scan_brcode" size="small">条刑码识别</nut-button>
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
const qrcodeContent = ref('')
const brcodeContent = ref('')
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const scan_qrcode = async () => {
  let result = await sdk.scan.qrcode()
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    qrcodeContent.value = result.data
    showToast.success('success')
  }
}
const scan_brcode = async () => {
  let result = await sdk.scan.brcode()
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    brcodeContent.value = result.data
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
