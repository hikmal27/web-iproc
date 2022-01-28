<template>
    <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
      <h1 class="tw-text-2xl tw-font-semibold">Edit</h1>
    </div>

    <div class="tw-p-4">
        <div class="tw-w-full tw-p-4 tw-bg-white tw-rounded-sm">
            <form @submit.prevent="editUser" class="tw-full">
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
                        <q-select filled v-model="Role" multiple use-chips :options="RoleOpt" stack-label />
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
                    <button class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-orange-600 tw-text-white tw-text-base tw-rounded-sm">Submit</button>
                    <router-link to="/managements/user" class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-green-600 tw-text-white tw-text-base tw-rounded-sm tw-text-center">Cancel</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'detail-user',
    setup() {
        return {
            Name: ref(''),
            Username: ref(''),
            Email: ref(''),
            Password: ref(''),
            Role: ref([]),
            isPwd: ref(true),
            RoleOpt: ref([])
        }
    },
    mounted() {
        this.getDetailUser()
        this.getRoles()
    },
    methods: {
        getDetailUser() {
            let self = this

            self.$api.get('/users/' + self.$route.params.id)
                .then((ress) => {
                    console.log(ress.data.data)
                    let item = ress.data.data
                    self.Name = item.Name
                    self.Username = item.Username
                    self.Email = item.Email
                    item.Roles.forEach(data => {
                        self.Role.push({label: data.Name, value: data.ID})
                    })
                    // item.Role.forEach((data) => {
                    //     self.Role.push({label: data.Name, value: data.ID})
                    // })
                    // console.log(self.Role)
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        getRoles() {
            let self = this
            self.$api.get('/roles')
                .then((ress) => {
                    ress.data.data.forEach((item) => {
                        self.RoleOpt.push({label: item.Name, value: item.ID})
                    })
                    // console.log(self.RoleOpt)
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        editUser() {
            let self = this

            let role = self.Role.map(x => x.value)

            let data = {
                username: self.Username,
                name: self.Name,
                email: self.Email,
                password: self.Password,
                role_id: role
            }

            console.log(data)

            
            
            self.$api.put('/users/' + self.$route.params.id, data)
                .then((ress) => {
                    // console.log(ress.status)
                    if (ress.status == 200) {
                        self.$q.notify({
                            message: 'User has been updated!',
                            color: 'positive'
                        })
                    } else {
                        self.$q.notify({
                            message: 'User cant be updated!',
                            color: 'negative'
                        })
                    }
                    self.Name = ''
                    self.Username = ''
                    self.Email = ''
                    self.Password = ''
                    self.Role = ''
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }
})
</script>
