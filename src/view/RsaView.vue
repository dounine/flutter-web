<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="非对称加密/rsa">
      <template #left>
        <div>返回</div>
      </template>
    </nut-navbar>
    <nut-input
        v-model="content"
        placeholder="内容"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="encrypt" size="small">encrypt</nut-button>
      </template>
    </nut-input>
    <div v-if="encryptResult" class="break-all p-2 m-2 text-gray-500 border rounded-md bg-gray-100 dark:bg-slate">
      {{ encryptResult }}
    </div>
    <nut-input
        v-model="contentEncrypt"
        placeholder="私钥加密内容"
        clearable
    >
      <template #right>
        <nut-button type='primary' @click="decrypt" size="small">decrypt</nut-button>
      </template>
    </nut-input>
    <div v-if="decryptResult" class="break-all p-2 m-2 text-gray-500 border rounded-md bg-gray-100 dark:bg-slate">
      {{ decryptResult }}
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
const content = ref('')
const contentEncrypt = ref('')
const encryptResult = ref('')
const decryptResult = ref('')
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const encrypt = async () => {
  let result = await sdk.rsa.encrypt({content: content.value})
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    encryptResult.value = result.data
    showToast.success('success')
  }
}
const decrypt = async () => {
  let result = await sdk.rsa.decrypt({content: contentEncrypt.value})
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    decryptResult.value = result.data
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
