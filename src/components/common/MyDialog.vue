<template>
  <div class="fixed inset-x-0 inset-y-0 z-50">
    <input type="checkbox" id="my_model" class="modal-toggle hidden" @change="checkChange" v-model="check"/>
    <div class="flex justify-center items-center h-screen modal">
      <div class="modal-box">
        <div class="font-medium flex items-center">
          <svg v-if="type==='info'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               class="stroke-neutral shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-else-if="type==='warning'" xmlns="http://www.w3.org/2000/svg"
               class="stroke-warning shrink-0 h-6 w-6"
               fill="none"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <svg v-else-if="type==='error'" xmlns="http://www.w3.org/2000/svg"
               class="stroke-error shrink-0 h-6 w-6"
               fill="none"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="ml-2">{{ title }}</span>
        </div>
        <p class="py-4">{{ text }}</p>
        <div class="modal-action">
          <label v-if="closeText" @click="onCloseFun" for="my_model" class="btn btn-ghost">{{ closeText }}</label>
          <label v-if="okText" @click="onOkFun" for="my_model" class="btn btn-primary">{{ okText }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const check = ref(true)
const checkChange = (value) => {
  if (!check.value) {
    props.close()
  }
}
const onOkFun = () => {
  if (props.onOk(props.close)) {
    props.close()
  }
}
const onCloseFun = () => {
  if (props.onClose(props.close)) {
    props.close()
  }
}
const props = defineProps({
  type: {
    type: String,
    default: 'info'
  },
  title: {
    type: String,
    default: '温馨提示',
  },
  text: {
    type: String,
    default: '',
  },
  closeText: {
    type: String,
    default: ''
  },
  okText: {
    type: String,
    default: ''
  },
  onOk: {
    type: Function,
  },
  onClose: {
    type: Function,
  },
  close: {
    type: Function
  },
});
</script>