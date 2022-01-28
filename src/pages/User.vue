<template>
  <q-page>
    <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
      <h1 class="tw-text-2xl tw-font-semibold ">Users</h1>
    </div>

    <div class="tw-w-48 tw-mt-2 tw-p-4">
      <router-link to="/managements/user/create">
        <div class="tw-px-3 tw-py-3 tw-bg-white tw-rounded-sm tw-text-center">
          <p class="tw-text-xs tw-font-semibold">Create New</p>
        </div>
      </router-link>
    </div>

    <div class="tw-p-4">
      <div class="tw-w-full tw-p-3 tw-overflow-hidden tw-rounded-sm tw-bg-white">
        <div class="tw-w-full tw-overflow-x-auto">
          <table class="tw-w-full">
            <thead>
              <tr class="tw-text-xs tw-text-left tw-font-semibold tw-uppercase tw-text-gray-400 tw-bg-gray-50">
                <th class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-font-semibold tw-text-left">Username</div>
                </th>
                <th class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-font-semibold tw-text-left">Name</div>
                </th>
                <th class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-font-semibold tw-text-left">Email</div>
                </th>
                <th class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-font-semibold tw-text-left">Created By</div>
                </th>
                <th class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-font-semibold tw-text-left">Action</div>
                </th>
              </tr>
            </thead>
            <tbody class="tw-text-sm tw-divide-y tw-divide-gray-100">
              <tr v-for="user in users" :key="user.ID" class="tw-text-gray-700">
                <td class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-flex tw-items-center">
                    <div class="tw-font-medium tw-text-gray-800">{{ user.Username }}</div>
                  </div>
                </td>
                <td class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-flex tw-items-center">
                    <div class="tw-font-medium tw-text-gray-800">{{ user.Name }}</div>
                  </div>
                </td>
                <td class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-flex tw-items-center">
                    <div class="tw-font-medium tw-text-gray-800">{{ user.Email }}</div>
                  </div>
                </td>
                <td class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-flex tw-items-center">
                    <div class="tw-font-medium tw-text-gray-800">{{ user.CreatedBy }}</div>
                  </div>
                </td>
                <td class="tw-p-2 tw-space-x-2">
                  <router-link :to="'/managements/user/' + user.ID" class="tw-text-base tw-text-yellow-500"><q-icon name="eva-edit-outline"></q-icon></router-link>
                  <button class="tw-text-base tw-text-red-700" @click="confirmDelete(user.ID)"><q-icon name="eva-trash-2-outline"></q-icon></button>
                  <q-dialog v-model="confirm" persistent>
                    <q-card>
                      <q-card-section class="row items-center">
                        <q-avatar>
                          <q-icon name="eva-trash-2-outline" class="tw-text-4xl tw-text-red-600"></q-icon>
                        </q-avatar>
                        <span class="q-ml-sm">You are sure you want to delete it?</span>
                      </q-card-section>

                      <q-card-actions align="right">
                        <q-btn flat label="Cancel" color="primary" v-close-popup />
                        <q-btn flat label="Yes" color="negative" @click="deleteUser()" />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'user',
  setup() {
    return {
      users: ref([]),
      confirm: ref(false),
      id: ref(null)
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.$api.get('/users')
        .then((ress) => {
          this.users = ress.data.data
          console.log(this.users)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    confirmDelete(id){
      this.confirm = true
      this.id = id
    },

    deleteUser() {
      let self = this 
      
      self.$api.delete('/users/' + this.id + '/force')
        .then((ress) => {
          console.log("User success deleted!", ress)
          this.confirm = false
          self.getUsers()
        })
        .catch((err) => {
          console.log(err)
        })
    },
  }
})
</script>