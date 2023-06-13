<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="窗口/window">
      <template #left>
        <div>返回</div>
      </template>
    </nut-navbar>
    <nut-input
        v-model="windowUrl"
        placeholder="链接"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="newWindow" size="small">新建窗口</nut-button>
      </template>
    </nut-input>
  </div>
</template>
<script setup>
import {
  showToast
} from "@nutui/nutui";
import {Loading} from "@nutui/icons-vue";
import {ref, reactive, onBeforeMount, getCurrentInstance, onBeforeUnmount} from "vue";
import sdk from "@/util/sdk.js";

const {proxy} = getCurrentInstance();
const windowUrl = ref('https://baidu.com')
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const newWindow = async () => {
  let result = await sdk.window.single({url: windowUrl.value})
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
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
