<template>
  <div class="container flex items-center min-h-[80vh] px-6 py-12 mx-auto">
    <div class="flex flex-col items-center max-w-sm mx-auto text-center">
      <h1 class="mt-3 text-2xl font-semibold md:text-2xl">404 找不到对应的页面</h1>
      <p class="mt-4 text-gray-500">对不起，您访问的这个页面不存在，或者被删除了。11asldfkjalsdkjf</p>

      <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
        <a href="javascript:history.back()" class="btn w-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          返回
        </a>
        <a href="/#/home" class="btn btn-primary w-1/2 normal-case">
          Home主页
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>

<style lang="scss" scoped>

</style>
