<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="弹窗/alert">
      <template #left>
        <div>返回</div>
      </template>
    </nut-navbar>
    <nut-form>
      <nut-form-item label="类型">
        <nut-radio-group v-model="basicData.type" direction="horizontal">
          <nut-radio label="info">信息</nut-radio>
          <nut-radio label="warning">警告</nut-radio>
          <nut-radio label="confirm">确认</nut-radio>
          <nut-radio label="error">错误</nut-radio>
          <nut-radio label="loading">加载</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="标题">
        <nut-input v-model="basicData.title" class="nut-input-text" placeholder="请输入标题" type="text"/>
      </nut-form-item>
      <nut-form-item label="文本">
        <nut-input v-model="basicData.text" class="nut-input-text" placeholder="请输入文本" type="text"/>
      </nut-form-item>
      <nut-form-item label="确定文字">
        <nut-input v-model="basicData.confirmBtnText" class="nut-input-text" placeholder="请输入确定按钮文本"
                   type="text"/>
      </nut-form-item>
      <nut-form-item label="取消文字">
        <nut-input v-model="basicData.cancelBtnText" class="nut-input-text" placeholder="请输入取消按钮文本"
                   type="text"/>
      </nut-form-item>
      <nut-form-item label="点击按钮窗口自动关闭">
        <nut-switch v-model="basicData.autoClose"></nut-switch>
      </nut-form-item>
      <nut-cell class="flex flex-1 justify-center">
        <nut-button type="primary" size="small" style="margin-right: 10px" @click="submit">显示</nut-button>
        <nut-button type="primary" size="small" style="margin-right: 10px" @click="close">3秒后自动关闭</nut-button>
      </nut-cell>
    </nut-form>
  </div>
</template>
<script setup>
import {
  showToast
} from "@nutui/nutui";
import {ref, reactive, onBeforeMount, getCurrentInstance, onBeforeUnmount} from "vue";
import sdk from "@/util/sdk.js";

const {proxy} = getCurrentInstance();
const basicData = reactive({
  type: 'info',
  title: '我的标题',
  text: '我的文本',
  confirmBtnText: '确定',
  cancelBtnText: '取消',
  autoClose: true
})
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const close = async () => {
  setTimeout(async () => {
    let result = await sdk.alert.close()
    if (result.code !== 0) {
      showToast.fail(result.msg)
    } else {
      showToast.success('success')
    }
  }, 3000)
}
const submit = async () => {
  let result = await sdk.alert.show({
    ...basicData,
    onConfirm: function () {
      showToast.success('ok')
    },
    onCancel: function () {
      showToast.success('cancel')
    }
  })
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
