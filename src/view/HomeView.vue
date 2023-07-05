<template>
  <div>
    <CellGroup>
      <Cell title="缓存" to="/cache" desc="cache"></Cell>
      <div class="divider m-0"></div>
      <Cell title="导航" to="/navigator" desc="navigator"></Cell>
      <div class="divider m-0"></div>
      <Cell title="小程序" to="/mini_program" desc="mini_program"></Cell>
      <div class="divider m-0"></div>
      <Cell title="窗口" to="/window" desc="window"></Cell>
      <div class="divider m-0"></div>
      <Cell title="聊天" to="/chat" desc="chat"></Cell>
      <div class="divider m-0"></div>
      <Cell title="数据库" to="/db" desc="db"></Cell>
      <div class="divider m-0"></div>
      <Cell title="分享" to="/share" desc="share"></Cell>
      <div class="divider m-0"></div>
      <Cell title="非对称加密" to="/rsa" desc="rsa"></Cell>
      <div class="divider m-0"></div>
      <Cell title="数字加密" to="/crypto" desc="crypto"></Cell>
      <div class="divider m-0"></div>
      <Cell title="启动器" to="/launcher" desc="launcher"></Cell>
      <div class="divider m-0"></div>
      <Cell title="扫码" to="/scan" desc="scan"></Cell>
      <div class="divider m-0"></div>
      <Cell title="弹窗" to="/alert" desc="alert"></Cell>
      <div class="divider m-0"></div>
      <Cell title="图片选择" to="/image" desc="image"></Cell>
      <div class="divider m-0"></div>
      <Cell title="粘贴板" to="/clipboard" desc="clipboard"></Cell>
      <div class="divider m-0"></div>
      <Cell title="振动反馈" to="/feedback" desc="feedback"></Cell>
      <div class="divider m-0"></div>
      <Cell title="设备信息" to="/device" desc="device"></Cell>
    </CellGroup>
    <div class="h-20"></div>
  </div>
</template>
<script setup>
import {ref, reactive, onBeforeMount, getCurrentInstance, onBeforeUnmount} from "vue";
import CellGroup from "@/components/CellGroup.vue";

const {proxy} = getCurrentInstance();
onBeforeMount(async () => {

});
onBeforeUnmount(async () => {
})
</script>

<style lang="scss" scoped>

</style>
