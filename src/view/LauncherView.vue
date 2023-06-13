<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="启动器/launcher">
      <template #left>
        <div>返回</div>
      </template>
    </nut-navbar>
    <nut-input
        v-model="url"
        placeholder="链接"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="launcher" size="small">launcher</nut-button>
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
const url = ref('https://baidu.com')
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const launcher = async () => {
  let result = await sdk.launcher.url({url: url.value, tip: '找不到支付应用'})
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
