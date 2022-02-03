<template>
    <q-page>
        <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
            <h1 class="tw-text-2xl tw-font-semibold">Create Role</h1>
        </div>

        <div class="tw-flex tw-flex-row tw-p-4">
            <div class="tw-flex-1 tw-p-4 tw-bg-white tw-rounded-sm">
                <form @submit.prevent="createRole" class="tw-full">
                    <div class="tw-flex tw-flex-row">
                        <div class="tw-flex tw-flex-1 tw-flex-col tw-flex-wrap tw--mx-3 tw-mb-6">
                            <div class="tw-w-full tw-px-3 tw-mb-6 md:tw-mb-0">
                                <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                    Name
                                </label>
                                <q-input filled v-model="Name" type="text" placeholder="Name" />
                            </div>
                            <div class="tw-w-full tw-px-3 tw-mt-5">
                                <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                    Description
                                </label>
                                <q-input filled v-model="Description" type="text" placeholder="Description" />
                            </div>
                        </div>
                        <div class="tw-flex-1 tw-p-4 tw-bg-white tw-rounded-sm">
                            <div class="tw-flex"> 
                                <q-tree
                                    class="tw-w-full"
                                    :nodes="Menus"
                                    v-model:ticked="ticked"
                                    node-key="label"
                                    :tick-strategy="tickStrategy"
                                    default-expand-all
                                />
                                <!-- <div>
                                    <h1>Ticked</h1>
                                    <p v-for="tick in ticked" :key="`ticked-${tick}`">{{ tick }}</p>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <!-- Submit -->
                    <div class="tw-flex tw-justify-center tw-space-x-2">
                        <button class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-orange-600 tw-text-white tw-text-sm tw-rounded-sm">Submit</button>
                        <router-link to="/setting/role" class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-green-600 tw-text-white tw-text-sm tw-rounded-sm tw-text-center">Cancel</router-link>
                    </div>
                </form>
            </div>
            
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'create-role',
    setup() {
        return {
            Name: ref(''),
            Description: ref(''),
            ticked: ref([]),
            tickStrategy: ref('leaf'),
            Permission: ref([]),
            Menus: ref([])
            // tickStrategies: ref([
            //     { value: 'strict', label: 'Strict' }
            // ]),
        }
    },
    mounted() {
        // this.getPermissions()
        this.getMenus()
    },
    methods: {
        createRole() {
            let self = this
            let data = {
                name: self.Name
            }

            self.$api.post('/roles', data)
                .then(ress => {
                    console.log("Role has been created", ress.data.data)
                    if(ress.status == 200) {
                        self.$q.notify({
                            message: 'Role has been created!',
                            color: 'positive'
                        })
                    } else {
                        self.$q.notify({
                            message: 'Role cant be created!',
                            color: 'negative'
                        })
                    }

                    self.Name = '',
                    self.Description = ''
                })
                .catch(err => {
                    console.log(err)
                })
        },

        // getPermissions() {
        //     let vm = this

        //     vm.$api.get('/permissions')
        //         .then(ress => {
        //             console.log(ress.data.data)
        //             ress.data.data.forEach((item) => {
        //                 vm.Permission.push({ label: item.Name, children: [item.Name] })
        //             })
        //         })
        //         .catch(err => console.log(err));
        // }

        getMenus() {
            let vm = this

            vm.$api.get('/menus')
                .then((ress) => {
                    let data = ress.data.data
                    data.forEach((item) => {
                        vm.Menus.push({ label: item.Name, children: item.Childs.map((x) => {
                            return { label: x.Name }
                        }) })
                    })
                })
                .catch((err) => console.log(err))
        }
    }
})
</script>
