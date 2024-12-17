<script setup lang="ts">
import GuestLayout from '@/layouts/GuestLayout.vue'
import InputLabel from '@/components/base/InputLabel.vue'
import TextInput from '@/components/base/TextInput.vue'
import InputError from '@/components/base/InputError.vue'
import PrimaryButton from '@/components/base/PrimaryButton.vue'
import { reactive, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

interface Form {
  email: string
  password: string
}
interface Validation {
  statusCode: number
  errors: Record<string, string[]>
}

const router = useRouter()
const isLoading: Ref<boolean> = ref(false)
const validation: Ref<Validation | null> = ref(null)
const form: Form = reactive({
  email: '',
  password: '',
})

const send = () => {
  return router.push({
    name: 'dashboard.index',
  })
}
</script>
<template>
  <GuestLayout>
    <form @submit.prevent="send()" class="space-y-4">
      <div>
        <InputLabel>email</InputLabel>
        <TextInput type="email" class="mt-1 block w-full" v-model="form.email" />
        <InputError
          v-if="validation && validation.statusCode === 400 && validation.errors.email"
          :message="validation.errors.email[0]"
        />
      </div>
      <div>
        <InputLabel>password</InputLabel>
        <TextInput type="password" class="mt-1 block w-full" v-model="form.password" />
        <InputError
          v-if="validation && validation.statusCode === 400 && validation.errors.password"
          :message="validation.errors.password[0]"
        />
      </div>
      <div class="flex justify-end">
        <PrimaryButton :disabled="isLoading" type="submit">login</PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>
