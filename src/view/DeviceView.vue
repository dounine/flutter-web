<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="设备信息/device">
      <template #left>
        <div>返回</div>
      </template>
    </nut-navbar>
    <nut-cell class="flex flex-1 justify-center">
      <nut-button type='primary' @click="device_info" size="small">device info</nut-button>
    </nut-cell>
    <div class="break-all p-2 m-2 text-gray-500 border rounded-md bg-gray-100 dark:bg-slate relative">
      <i class="icon icon-copy copy ml-2 text-gray-500 text-lg absolute r-0" data-clipboard-target="#device-info"></i>
      <div id="device-info">
        {{ infoResult }}
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  showToast
} from "@nutui/nutui";
import {ref, onBeforeMount, getCurrentInstance, onBeforeUnmount} from "vue";
import sdk from "@/util/sdk.js";

const {proxy} = getCurrentInstance();
const infoResult = ref('')
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const device_info = async () => {
  let result = await sdk.device.info()
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    infoResult.value = result.data
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
