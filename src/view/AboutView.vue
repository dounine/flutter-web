<template>
  <nut-cell-group>
    <nut-cell title="自己搭建" is-link to="/deploy"></nut-cell>
    <nut-cell title="存储占用" :desc="storage"></nut-cell>
    <nut-cell title="官方QQ交流群" desc="243916317" is-link
              url="https://jq.qq.com/?_wv=1027&k=hH1ELfCV"></nut-cell>
    <nut-cell title="技术支持" desc="from © ipadump.com"></nut-cell>
  </nut-cell-group>
</template>

<script setup>
import {ref, onBeforeMount, getCurrentInstance, reactive} from 'vue'

const storage = ref('0kb')
const {proxy} = getCurrentInstance()
const queryStorage = async () => {
  proxy.axios.get('/sign/storage')
      .then(res => {
        if (res.data.code === 0) {
          storage.value = res.data.data.size
        }
      })
}
onBeforeMount(async () => {
  await queryStorage()
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
