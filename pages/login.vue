<script setup lang='ts'>
definePageMeta({
  layout: 'login',
  middleware: ['only-visitor'],
})
</script>

<template>
  <div class="absolute left-50% top-50% w-560px -translate-x-1/2 -translate-y-1/2">
    <el-form>
      <el-form-item label="用户名" prop="username">
        <el-input />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input />
      </el-form-item>
    </el-form>
  </div>
</template>
