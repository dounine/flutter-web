<template>
  <div @click="toLink" class="flex p-3 cursor-pointer">
    <div class="flex-1 text-sm text-base">
      {{ title }}
    </div>
    <div class="flex flex-row">
      <div class="text-sm text-neutral-content">
        {{ desc }}
      </div>
      <div class="flex items-center">
        <i class="icon icon-right text-accent"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, getCurrentInstance} from 'vue';

const {proxy} = getCurrentInstance();
const props = defineProps({
  title: {
    type: String,
    default: 'title',
  },
  desc: {
    type: String,
    default: ''
  },
  to: {
    type: String
  }
});
const toLink = () => {
  if (props.to) {
    proxy.$router.push({
      path: props.to
    });
  }
}
</script>