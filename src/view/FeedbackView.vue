<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="振动反馈/feedback">
      <template #left>
        <div>返回</div>
      </template>
    </nut-navbar>
    <nut-form>
      <nut-form-item label="类型">
        <nut-radio-group v-model="basicData.type" direction="horizontal">
          <nut-radio label="success">成功</nut-radio>
          <nut-radio label="error">错误</nut-radio>
          <nut-radio label="warning">警告</nut-radio>
          <nut-radio label="selection">选择</nut-radio>
          <nut-radio label="heavy">重</nut-radio>
          <nut-radio label="medium">中</nut-radio>
          <nut-radio label="light">轻</nut-radio>
          <nut-radio label="impact">冲击</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-cell class="flex flex-1 justify-center">
        <nut-button type="primary" size="small" style="margin-right: 10px" @click="submit">振动</nut-button>
      </nut-cell>
    </nut-form>
  </div>
</template>
<script setup>
import {
  showToast
} from "@nutui/nutui";
import {ref, onBeforeMount, getCurrentInstance, onBeforeUnmount, reactive} from "vue";
import sdk from "@/util/sdk.js";

const {proxy} = getCurrentInstance();
const basicData = reactive({
  type: 'success',
})
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const submit = async () => {
  let result = null;
  if (basicData.type === 'success') {
    result = await sdk.feedback.success()
  } else if (basicData.type === 'error') {
    result = await sdk.feedback.error()
  } else if (basicData.type === 'warning') {
    result = await sdk.feedback.warning()
  } else if (basicData.type === 'selection') {
    result = await sdk.feedback.selection()
  } else if (basicData.type === 'heavy') {
    result = await sdk.feedback.heavy()
  } else if (basicData.type === 'medium') {
    result = await sdk.feedback.medium()
  } else if (basicData.type === 'light') {
    result = await sdk.feedback.light()
  } else if (basicData.type === 'impact') {
    result = await sdk.feedback.impact()
  }
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
