<script setup lang='ts'>
definePageMeta({
  layout: 'login',
  middleware: ['only-visitor'],
})

const formState = reactive({
  username: '',
  password: '',
})
const formRef = ref()
const formRules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
const loading = ref(false)

function loginHandler() {
  formRef.value.validate().then(() => {
    const { username, password } = formState
    loading.value = true
    useFetch('/api/login', {
      method: 'POST',
      body: { email: username, password },
    }).then((res) => {
      console.log(res, '111111111111')
    }).finally(() => {
      loading.value = false
    })
  })
}
</script>

<template>
  <div class="absolute left-50% top-50% w-560px -translate-x-1/2 -translate-y-1/2">
    <el-card>
      <el-form
        ref="formRef"
        class="w-full"
        :model="formState"
        autocomplete="off"
        :rules="formRules"
        status-icon
        @keydown.enter="loginHandler"
      >
        <el-form-item prop="username">
          <el-input v-model="formState.username" placeholder="用户名" size="large" clearable>
            <template #prefix>
              <el-icon>
                <span class="i-carbon:user-avatar" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password" class="!mb-40px">
          <el-input v-model="formState.password" type="password" placeholder="密码" size="large" clearable show-password>
            <template #prefix>
              <el-icon>
                <span class="i-carbon:locked" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="!mb-0">
          <el-button type="primary" class="w-full" :loading="loading" auto-insert-space size="large" @click="loginHandler">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
