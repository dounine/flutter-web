<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="分享/share">
      <template #left>
        <div>返回</div>
      </template>
      <template #right>
        <ShareN width="16px"></ShareN>
      </template>
    </nut-navbar>
    <nut-input
        v-model="url"
        placeholder="链接"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="shareUrl" size="small">share url</nut-button>
      </template>
    </nut-input>
    <nut-input
        v-model="path"
        placeholder="文件路径"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="shareFile" size="small">share file</nut-button>
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
const path = ref('')
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const shareUrl = async () => {
  let result = await sdk.share.url({url: url.value, subject: '最好的下载网站'})
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    showToast.success('success')
  }
}
const shareFile = async () => {
  let result = await sdk.share.file({path: path.value, subject: 'hello', text: 'hell.zip'})
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
