<template>
  <div class="w-full">
    <Navbar title="状态栏/status_bar"></Navbar>
    <div class="join w-full px-2">
      <input type="text" v-model="color" placeholder="Type here" class="input w-full join-item"/>
      <button class="btn join-item rounded-r-full" @click="setColorValue">set</button>
    </div>
  </div>
</template>
<script setup>
import {ref, onBeforeMount, getCurrentInstance, onBeforeUnmount} from "vue";
import sdk from "@/util/sdk.js";

const {proxy} = getCurrentInstance();
const color = ref('transparent')
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const setColorValue = async () => {
  await sdk.status_bar.change({color: color.value})
}
</script>

<style lang="scss" scoped>

</style>
