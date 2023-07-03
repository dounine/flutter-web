<template>
  <div>
    <div v-for="itype of ['info','warning','error','success'].filter(i=>i===type)" class="relative flex justify-center">
      <div class="fixed top-1/3 z-50 flex max-w-md w-full px-4">
        <div
            v-bind:class="{'bg-info':itype==='info','bg-warning':itype==='warning','bg-success':itype==='success','bg-error':itype==='error'}"
            class="py-4 px-6 flex rounded-l-md items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="fill-base-100 w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
            <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
        </div>
        <div
            class="border-l-0 px-4 py-6 bg-base-100 flex justify-between items-center w-full border border-base-200 rounded-r-md">
          <div>
            <h3 class="font-bold" v-if="title">{{ title }}</h3>
            <div>{{ text }}</div>
          </div>
          <div class="flex flex-row space-x-1">
            <button v-if="closeText" @click="onCloseFun" class="btn btn-sm btn-ghost">{{ closeText }}</button>
            <button v-if="okText" @click="onOkFun" class="btn btn-sm btn-primary">{{ okText }}</button>
            <button v-if="closeIcon" @click="closeIconFun">
              <svg xmlns="http://www.w3.org/2000/svg" class="fill-base-content w-5 h-5" viewBox="0 0 16 16">
                <path
                    d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="type==='loading'" class="flex flex-row justify-center">
      <div class="fixed top-1/3 z-50 flex w-screen max-w-md px-4">
        <div class="bg-info py-4 px-6 flex rounded-l-md items-center">
          <span class="loading loading-spinner text-base-100"></span>
        </div>
        <div
            class="border-l-0 px-4 py-6 bg-base-100 flex justify-between items-center w-full border border-base-200 rounded-r-md">
          <div>
            <h3 class="font-bold" v-if="title">{{ title }}</h3>
            <div>{{ text }}</div>
          </div>
          <div class="flex flex-row space-x-1">
            <button v-if="closeText" @click="onCloseFun" class="btn btn-sm">{{ closeText }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const onOkFun = () => {
  if (props.onOk(props.close)) {
    props.close()
  }
}
const closeIconFun = () => {
  props.close()
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
    default: ''
  },
  okText: {
    type: String,
    default: ''
  },
  closeText: {
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
  text: {
    type: String,
    default: '',
  },
  closeIcon: {
    type: Boolean,
    default: false
  }
});
</script>