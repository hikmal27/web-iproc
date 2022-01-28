<template>
  <q-page>
    <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
      <h1 class="tw-text-2xl tw-font-semibold">Create</h1>
    </div>

    <div class="tw-p-4">
        <div class="tw-w-full tw-p-4 tw-bg-white tw-rounded-sm">
            <form @submit.prevent="create" class="tw-full">
                <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                    <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                        <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                            Name
                        </label>
                        <q-input filled v-model="Name" type="text" placeholder="Name" />
                    </div>
                    <div class="tw-w-full md:tw-w-1/2 tw-px-3">
                        <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                            Username
                        </label>
                        <q-input filled v-model="Username" type="text" placeholder="Username" />
                    </div>
                </div>

                <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                    <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                        <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                            Email
                        </label>
                        <q-input filled v-model="Email" type="email" placeholder="Email" />
                    </div>
                    <div class="tw-w-full md:tw-w-1/2 tw-px-3">
                        <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                            Role
                        </label>
                        <q-select filled v-model="Role" use-chips :options="RoleOpt" stack-label />
                    </div>
                </div>

                <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                    <div class="tw-w-full tw-px-3 ">
                        <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">Password</label>
                        <q-input filled v-model="Password" :type="isPwd ? 'password' : 'text'" placeholder="************" class="tw-w-full">
                            <template v-slot:append>
                                <q-icon :name="isPwd ? 'eva-eye-outline' : 'eva-eye-off-outline'" @click="isPwd = !isPwd" />
                            </template>
                        </q-input>
                    </div>
                </div>
                <!-- Submit -->
                <div class="tw-flex tw-justify-center tw-space-x-2">
                    <button class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-orange-600 tw-text-white tw-text-sm tw-rounded-sm">Submit</button>
                    <router-link to="/managements/user" class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-green-600 tw-text-white tw-text-sm tw-rounded-sm tw-text-center">Cancel</router-link>
                </div>
            </form>
        </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "user-create",
  setup() {
    return {
        Name: ref(''),
        Username: ref(''),
        Email: ref(''),
        Password: ref(''),
        Role: ref([]),
        isPwd: ref(true),
        RoleOpt: ref([])
    };
  },
  mounted() {
      this.getRoles()
  },
  methods: {
      create() {
          let self = this
          let data = {
              username: self.Username,
              name: self.Name,
              email: self.Email,
              password: self.Password,
              role_id: parseInt(self.Role.value)
          }
        //   console.log(data)

          self.$api.post('/register', data)
            .then(ress => {
                console.log(ress)
                if(ress.status == 200) {
                    self.$q.notify({
                        message: 'User has been created!.',
                        color: 'positive'
                     })
                } else {
                    self.$q.notify({
                        message: 'User cant be created!.',
                        color: 'negative'
                     })
                }
                self.Name = ''
                self.Username = ''
                self.Email = ''
                self.Password = ''
                self.Role = ''
            })
            .catch(err => {
                console.log(err)
                self.$q.notify({
                    message: err,
                    color: 'negative'
                })
            })
      },

      getRoles() {
          let self = this
          self.$api.get('/roles')
            .then((ress) => {
                ress.data.data.forEach((item) => {
                    self.RoleOpt.push({label: item.Name, value: item.ID})
                })
                console.log(self.RoleOpt)
            })
            .catch((err) => {
                console.log(err)
            })
      }
  }
});
</script>
