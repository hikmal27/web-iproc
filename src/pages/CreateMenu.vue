<template>
    <q-page>
        <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
            <h1 class="tw-text-2xl tw-font-semibold">Create Menu</h1>
        </div>

        <div class="tw-p-4">
            <div class="tw-w-full tw-p-4 tw-bg-white tw-rounded-sm">
                <form @submit.prevent="createMenu" class="tw-full">
                    <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                            <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                Name
                            </label>
                            <q-input filled v-model="Name" type="text" placeholder="Name" />
                        </div>
                        <div class="tw-w-full md:tw-w-1/2 tw-px-3">
                            <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                Url
                            </label>
                            <q-input filled v-model="Url" type="text" placeholder="Url" />
                        </div>
                        
                    </div>
                    <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-flex-1 tw-px-3">
                            <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                Icon
                            </label>
                            <q-input filled v-model="Icon" type="text" placeholder="Icon" />
                        </div>
                        <div class="tw-px-3">
                            <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                Order
                            </label>
                            <q-input filled v-model="Order" type="text" placeholder="Order" />
                        </div>
                        <div class="tw-flex-1 tw-px-3">
                            <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                Parent ID
                            </label>
                            <q-select filled v-model="ParentID" :options="Menus" stack-label />
                            <!-- <q-input filled v-model="ParentID" type="text" placeholder="Order" /> -->
                        </div>
                    </div>
                    <!-- Submit -->
                    <div class="tw-flex tw-justify-center tw-space-x-2">
                        <button class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-orange-600 tw-text-white tw-text-sm tw-rounded-sm">Submit</button>
                        <router-link to="/managements/menu" class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-green-600 tw-text-white tw-text-sm tw-rounded-sm tw-text-center">Cancel</router-link>
                    </div>
                </form>
            </div>
        </div>
    </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'create-menu',
    setup() {
        return {
            Name: ref(''),
            Url: ref(''),
            Icon: ref(''),
            Order: ref(''),
            ParentID: ref(''),
            Menus: ref([]),
        }
    },
    mounted() {
        this.getMenus()
    },
    methods: {
        createMenu() {
            let self = this
            let data = {
                name: self.Name,
                url: self.Url,
                icon: self.Icon,
                order: parseInt(self.Order),
                parent_id: parseInt(self.ParentID.value)
            }
            console.log(data)

            self.$api.post('/menus', data)
                .then(ress => {
                    let item = ress.data.data
                    console.log(item)
                    
                    if(ress.status == 200) {
                        self.$q.notify({
                            message: 'Menu has been created!',
                            color: 'positive'
                        })
                    } else {
                        self.$q.notify({
                            message: 'Menu cant be created!',
                            color: 'negative'
                        })
                    }

                    self.Name = ''
                    self.Url = ''
                    self.Icon = ''
                    self.Order = ''
                    self.ParentID = ''
                })
                .catch(err => console.log(err));
        },

        getMenus() {
            let vm = this

            vm.$api.get('/menus')
                .then((ress) => {
                    let item = ress.data.data
                    item.forEach((data) => {
                        vm.Menus.push({ label: data.Name, value: data.ID })
                    })
                    // console.log(vm.Menus)
                })
                .catch((err) => console.log(err));
        }
    }
}
</script>