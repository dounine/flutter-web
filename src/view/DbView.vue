<template>
  <div class="dark:bg-slate">
    <nut-navbar @on-click-back="back" title="数据库/db">
      <template #left>
        <div>返回</div>
      </template>
    </nut-navbar>
    <nut-input
        v-model="executeValue"
        placeholder="execute sql"
        clearable
    >
      <template #right>
        <nut-button :loading="loading" type='primary' @click="execute" size="small">execute</nut-button>
      </template>
    </nut-input>
    <nut-input
        v-model="queryValue"
        placeholder="execute sql"
        clearable
    >
      <template #right>
        <nut-button :loading="loading" type='primary' @click="query" size="small">query</nut-button>
      </template>
    </nut-input>
    <div v-if="queryResult" class="break-all p-2 m-2 text-gray-500 border rounded-md bg-gray-100 dark:bg-slate">
      {{ queryResult }}
    </div>
    <nut-input
        v-model="insertValue"
        placeholder="insert sql"
        clearable
    >
      <template #right>
        <nut-button :loading="loading" type='primary' @click="insert" size="small">insert</nut-button>
      </template>
    </nut-input>
    <nut-input
        v-model="updateValue"
        placeholder="update sql"
        clearable
    >
      <template #right>
        <nut-button :loading="loading" type='primary' @click="update" size="small">update</nut-button>
      </template>
    </nut-input>
    <nut-input
        v-model="delValue"
        placeholder="del sql"
        clearable
    >
      <template #right>
        <nut-button :loading="loading" type='primary' @click="del" size="small">del</nut-button>
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
const executeValue = ref('CREATE TABLE Friend(uid TEXT primary key,name TEXT,avatarUrl TEXT,type INTEGER,key TEXT,time TEXT)')
const queryValue = ref('select * from Friend')
const queryResult = ref('')
const insertValue = ref(`insert into Friend(uid,name,avatarUrl,type,key,time) values('123','lake','header',0,'secret','2021-01-01 12:12:12')`)
const updateValue = ref(`update Friend set name = "lake2" where uid = "123"`)
const delValue = ref('delete from Friend where uid = "123"')
const loading = ref(false)
const back = () => {
  proxy.$router.push({
    name: 'home'
  });
}
const execute = async () => {
  loading.value = true
  let result = await sdk.db.execute({sql: executeValue.value})
  loading.value = false
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    showToast.success('success')
  }
}
const query = async () => {
  loading.value = true
  let result = await sdk.db.query({sql: queryValue.value, args: []})
  loading.value = false
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    queryResult.value = result.data
    showToast.success('success')
  }
}
const insert = async () => {
  loading.value = true
  let result = await sdk.db.insert({sql: insertValue.value, args: []})
  loading.value = false
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    showToast.success('success')
  }
}
const update = async () => {
  loading.value = true
  let result = await sdk.db.update({sql: updateValue.value, args: []})
  loading.value = false
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
    showToast.success('success')
  }
}
const del = async () => {
  loading.value = true
  let result = await sdk.db.delete({sql: delValue.value, args: []})
  loading.value = false
  if (result.code !== 0) {
    showToast.fail(result.msg)
  } else {
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
