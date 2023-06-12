<template>
  <div class="dark:bg-slate">
    <nut-cell-group>
      <nut-cell title="缓存" is-link desc="cache" to="/cache"></nut-cell>
      <nut-cell title="窗口" is-link desc="window" to="/window"></nut-cell>
      <nut-cell title="数据库" is-link desc="db" to="/db"></nut-cell>
      <nut-cell title="分享" is-link desc="share" to="/share"></nut-cell>
      <nut-cell title="非对称加密" is-link desc="rsa" to="/rsa"></nut-cell>
      <nut-cell title="数字加密" is-link desc="crypto" to="/crypto"></nut-cell>
      <nut-cell title="启动器" is-link desc="launcher" to="/launcher"></nut-cell>
      <nut-cell title="扫码" is-link desc="scan" to="/scan"></nut-cell>
      <nut-cell title="弹窗" is-link desc="alert" to="/alert"></nut-cell>
      <nut-cell title="图片选择" is-link desc="image" to="/image"></nut-cell>
      <nut-cell title="粘贴板" is-link desc="clipboard" to="/clipboard"></nut-cell>
      <nut-cell title="振动反馈" is-link desc="feedback" to="/feedback"></nut-cell>
    </nut-cell-group>
  </div>
</template>
<script setup>
import {
  showToast
} from "@nutui/nutui";
import {Loading} from "@nutui/icons-vue";
import {ref, reactive, onBeforeMount, getCurrentInstance, onBeforeUnmount} from "vue";
import Common from "../util/common.js";

const {proxy} = getCurrentInstance();
onBeforeMount(async () => {

});
onBeforeUnmount(async () => {
})
</script>

<style lang="scss" scoped>

</style>
