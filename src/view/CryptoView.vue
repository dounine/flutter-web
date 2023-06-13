<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="数字加密/crypto">
      <template #left>
        <div>返回</div>
      </template>
    </nut-navbar>
    <nut-input
        v-model="md5Content"
        placeholder="内容"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="md5" size="small">md5</nut-button>
      </template>
    </nut-input>
    <div v-if="md5Result" class="break-all p-2 m-2 text-gray-500 border rounded-md bg-gray-100 dark:bg-slate">
      {{ md5Result }}
    </div>
    <nut-input
        v-model="sha1Content"
        placeholder="内容"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="sha1" size="small">sha1</nut-button>
      </template>
    </nut-input>
    <div v-if="sha1Result" class="break-all p-2 m-2 text-gray-500 border rounded-md bg-gray-100 dark:bg-slate">
      {{ sha1Result }}
    </div>
    <nut-input
        v-model="sha256Content"
        placeholder="内容"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="sha256" size="small">sha256</nut-button>
      </template>
    </nut-input>
    <div v-if="sha256Result" class="break-all p-2 m-2 text-gray-500 border rounded-md bg-gray-100 dark:bg-slate">
      {{ sha256Result }}
    </div>
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
const md5Content = ref('')
const md5Result = ref('')
const sha1Content = ref('')
const sha1Result = ref('')
const sha256Content = ref('')
const sha256Result = ref('')
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const md5 = async () => {
  let result = await sdk.crypto.md5({content: md5Content.value})
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    md5Result.value = result.data
    showToast.success('success')
  }
}
const sha1 = async () => {
  let result = await sdk.crypto.sha1({content: md5Content.value})
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    md5Result.value = result.data
    showToast.success('success')
  }
}
const sha256 = async () => {
  let result = await sdk.crypto.sha256({content: md5Content.value})
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    md5Result.value = result.data
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
