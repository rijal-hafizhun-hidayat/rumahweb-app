<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import InputLabel from '@/components/base/InputLabel.vue'
import TextInput from '@/components/base/TextInput.vue'
import PrimaryButton from '@/components/base/PrimaryButton.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, type Ref } from 'vue'
import type { AxiosError } from 'axios'
import api from '@/plugins/api'

interface User {
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
  address: Address
  company: Company
}
interface Address {
  city: string
  street: string
  suite: string
  zipcode: string
}
interface Company {
  bs: string
  catchPhrase: string
  name: string
}

const user: Ref<User | null> = ref(null)
const route = useRoute()
const isLoading: Ref<boolean> = ref(false)
const router = useRouter()

onMounted(async () => {
  try {
    isLoading.value = true
    const result = await api.get(`users/${route.params.userId}`)
    console.log(result)
    user.value = result.data as User
  } catch (error) {
    const err = error as AxiosError
    console.log(err)
  } finally {
    isLoading.value = false
  }
})

const toUser = () => {
  router.push({
    name: 'user.index',
  })
}
</script>
<template>
  <DashboardLayout>
    <div v-if="user && !isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md space-y-4 overflow-x-auto">
        <div>
          <h1 class="font-semibold mb-2">Profile</h1>
          <hr />
        </div>
        <div>
          <InputLabel>name</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.name" />
        </div>
        <div>
          <InputLabel>email</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.email" />
        </div>
        <div>
          <InputLabel>phome</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.phone" />
        </div>
        <div>
          <InputLabel>username</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.username" />
        </div>
        <div>
          <InputLabel>website</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.website" />
        </div>
        <div>
          <InputLabel>email</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.email" />
        </div>
        <div>
          <h1 class="font-semibold mb-2">Address</h1>
          <hr />
        </div>
        <div>
          <InputLabel>city</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.address.city" />
        </div>
        <div>
          <InputLabel>street</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.address.street" />
        </div>
        <div>
          <InputLabel>suite</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.address.suite" />
        </div>
        <div>
          <InputLabel>zipcode</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.address.zipcode" />
        </div>
        <div>
          <h1 class="font-semibold mb-2">Company</h1>
          <hr />
        </div>
        <div>
          <InputLabel>name company</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.company.name" />
        </div>
        <div>
          <InputLabel>bs company</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.company.bs" />
        </div>
        <div>
          <InputLabel>Catch Phrase</InputLabel>
          <TextInput disabled class="block w-full mt-1" v-model="user.company.catchPhrase" />
        </div>
        <div>
          <PrimaryButton :disabled="isLoading" @click="toUser()" type="button">back</PrimaryButton>
        </div>
      </div>
    </div>
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md space-y-4 overflow-x-auto">
        <p>loading ...</p>
      </div>
    </div>
  </DashboardLayout>
</template>
