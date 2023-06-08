<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="缓存/cache">
      <template #left>
        <div>返回</div>
      </template>
      <template #right>
        <ShareN width="16px"></ShareN>
      </template>
    </nut-navbar>
    <nut-input
        v-model="setCacheValue"
        placeholder="内容"
        clearable
    >
      <template #right>
        <nut-button :loading="loading" type='primary' @click="setCache" size="small">set</nut-button>
      </template>
    </nut-input>
    <nut-input
        v-model="getCacheValue"
        disabled
        placeholder="响应结果"
        clearable
    >
      <template #right>
        <nut-button :loading="loading" type='primary' @click="getCache" size="small">get</nut-button>
      </template>
    </nut-input>
    <nut-input
        v-model="delCacheValue"
        disabled
        placeholder="响应结果"
        clearable
    >
      <template #right>
        <nut-button :loading="loading" type='primary' @click="detCache" size="small">del</nut-button>
      </template>
    </nut-input>
    <nut-input
        v-model="clearCacheValue"
        disabled
        placeholder="响应结果"
        clearable
    >
      <template #right>
        <nut-button :loading="loading" type='primary' @click="clearCache" size="small">clear</nut-button>
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
const setCacheValue = ref('hello cache!!')
const getCacheValue = ref('')
const delCacheValue = ref('')
const clearCacheValue = ref('')
const loading = ref(false)
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const setCache = async () => {
  loading.value = true
  let result = await sdk.cache_set({key: 'key', value: setCacheValue.value})
  loading.value = false
  console.log('set cache result -> ', result)
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    showToast.success('success')
  }
}
const getCache = async () => {
  loading.value = true
  let result = await sdk.cache_get({key: 'key'})
  loading.value = false
  console.log('get cache result -> ', result)
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    getCacheValue.value = result.data
    showToast.success('success')
  }
}
const detCache = async () => {
  loading.value = true
  let result = await sdk.cache_del({key: 'key'})
  loading.value = fales
  console.log('del cache result -> ', result)
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    delCacheValue.value = result.data
    showToast.success('success')
  }
}
const clearCache = async () => {
  loading.value = true
  let result = await sdk.cache_clear()
  loading.value = false
  console.log('clear cache result -> ', result)
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    clearCacheValue.value = result.data
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
