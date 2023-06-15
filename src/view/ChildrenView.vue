<template>
  <div>
    children root

    <router-link to="/children/a1">
      <button class="btn btn-primary">a1</button>
    </router-link>
    <router-link to="/children/a2">
      <button class="btn btn-primary">a2</button>
    </router-link>
    <router-view></router-view>
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
  let result = await sdk.cache.set({key: 'key', value: setCacheValue.value})
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
  let result = await sdk.cache.get({key: 'key'})
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
  let result = await sdk.cache.del({key: 'key'})
  loading.value = false
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
  let result = await sdk.cache.clear()
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
