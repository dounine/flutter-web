<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="图片/image">
      <template #left>
        <div>返回</div>
      </template>
    </nut-navbar>
    <nut-input
        v-model="path"
        placeholder="图片路径"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="image_choose" size="small">选择图片</nut-button>
      </template>
    </nut-input>
    <nut-input
        v-model="data"
        placeholder="图片路径"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="image_data" size="small">地址转base64</nut-button>
      </template>
    </nut-input>
    <div class="flex flex-1 justify-center m-2">
      <nut-image :src="data" width="30vh"></nut-image>
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
const path = ref('')
const data = ref('')
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const image_choose = async () => {
  let result = await sdk.image.choose()
  console.log(result)
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    path.value = result.data
    showToast.success('success')
  }
}
const image_data = async () => {
  let result = await sdk.image.base64({
    path: path.value
  })
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    data.value = result.data
    showToast.success('success')
  }
}
onBeforeUnmount(async () => {
})
</script>

<style lang="scss" scoped>

</style>
