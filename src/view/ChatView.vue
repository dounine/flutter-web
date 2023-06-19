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
