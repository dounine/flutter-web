<template>
  <div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
  </div>
</template>

<script setup>
import {ref, onBeforeMount, getCurrentInstance, reactive} from 'vue'
import sdk from "@/util/sdk.js";

const {proxy} = getCurrentInstance()
onBeforeMount(async () => {
  await sdk.chat.listen({
    loading: false,
    onMore: (data) => {
      proxy.$alert.success({
        title: '提示',
        text: '点击了更多按钮'
      })
    },
    onBack: (data) => {
      proxy.$alert.success({
        title: '提示',
        text: '点击了返回按钮'
      })
    },
    onMessage: (data) => {
      proxy.$alert.success({
        title: '提示',
        text: `收到消息:${data}`
      })
    },
  })
})

</script>

<style lang="scss" scoped>
.chatHeadBox {
  padding: 10px 0;

  .chatHead {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
}

.container {
  //height: calc(100vh - 100px);
  width: 100%;
}
</style>
