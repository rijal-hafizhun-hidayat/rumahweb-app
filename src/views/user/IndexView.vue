<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import PrimaryButton from '@/components/base/PrimaryButton.vue'
import TextInput from '@/components/base/TextInput.vue'
import api from '@/plugins/api'
import type { AxiosError } from 'axios'
import { computed, onMounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
  address: Address
}
interface Address {
  city: string
  street: string
  suite: string
  zipcode: string
}

const search: Ref<string> = ref('')
const router = useRouter()
const users: Ref<User[]> = ref([])
const isLoading: Ref<boolean> = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const result = await api.get('users')
    users.value = result.data as User[]
  } catch (error) {
    const err = error as AxiosError
    console.log(err)
  } finally {
    isLoading.value = false
  }
})

const toDetailUser = (userId: number) => {
  router.push({
    name: 'user.detail',
    params: {
      userId: userId,
    },
  })
}

const searchUserByName = computed(() => {
  const query = search.value.toLowerCase()
  return users.value.filter((user) => user.name.toLowerCase().includes(query))
})
</script>
<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <div class="grid grid-rows-1 sm:grid-cols-2 gap-3">
          <div>
            <TextInput v-model="search" placeholder="find user by name" class="block w-full" />
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <table class="w-full whitespace-nowrap">
          <thead>
            <tr class="text-left font-bold">
              <th class="pb-4 pt-6 px-6">#</th>
              <th class="pb-4 pt-6 px-6">Name</th>
              <th class="pb-4 pt-6 px-6">Email</th>
              <th class="pb-4 pt-6 px-6">Addres</th>
            </tr>
          </thead>
          <tbody v-if="users.length > 0">
            <tr v-for="(user, index) in searchUserByName" :key="user.id" class="hover:bg-gray-100">
              <td class="border-t items-center px-6 py-4">
                {{ index + 1 }}
              </td>
              <td
                class="border-t items-center px-6 py-4 hover:text-slate-500 cursor-pointer"
                @click="toDetailUser(user.id)"
              >
                {{ user.name }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{ user.email }}
              </td>
              <td class="border-t items-center px-6 py-4">
                {{
                  `${user.address.street} ${user.address.city} ${user.address.suite} ${user.address.zipcode}`
                }}
              </td>
              <td class="border-t items-center px-6 py-4 flex justify-start space-x-4">
                <div>
                  <PrimaryButton @click="toDetailUser(user.id)" type="button">Detail</PrimaryButton>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr class="hover:bg-gray-100">
              <td class="border-t items-center px-6 py-4 text-center" colspan="5">
                <span v-if="isLoading === true">loading ...</span>
                <span v-else>data not found</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
</template>
