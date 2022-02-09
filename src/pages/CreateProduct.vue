<template>
    <q-page>
        <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
            <h1 class="tw-text-2xl tw-font-semibold ">Create Product</h1>
        </div>

        <div class="tw-p-4">
            <div class="tw-w-full tw-p-4 tw-bg-white tw-rounded-sm">
                <form @submit.prevent="createProduct" class="tw-full">
                    <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-flex-1 tw-px-3">
                            <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                Name
                            </label>
                            <q-input filled v-model="Name" type="text" placeholder="Name" />
                        </div>
                        <div class="tw-px-3">
                            <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                Code
                            </label>
                            <q-input filled v-model="Code" type="text" placeholder="Code" />
                        </div>
                        <div class="tw-flex-1 tw-px-3">
                            <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                Code ID
                            </label>
                            <q-input filled v-model="CodeID" type="text" placeholder="Code ID" />
                            <!-- <q-select filled v-model="CodeID" :options="Menus" stack-label /> -->
                            <!-- <q-input filled v-model="ParentID" type="text" placeholder="Order" /> -->
                        </div>
                    </div>
                    <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full tw-px-3 tw-mb-6 md:tw-mb-0">
                            <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                Description
                            </label>
                            <q-input filled v-model="Description" type="text" placeholder="Description" />
                        </div>
                        
                    </div>
                    
                    <!-- Submit -->
                    <div class="tw-flex tw-justify-center tw-space-x-2">
                        <button class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-orange-600 tw-text-white tw-text-sm tw-rounded-sm">Submit</button>
                        <router-link to="/products" class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-green-600 tw-text-white tw-text-sm tw-rounded-sm tw-text-center">Cancel</router-link>
                    </div>
                </form>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        return {
            Name: ref(''),
            Description: ref(''),
            Icon: ref(''),
            Code: ref(''),
            CodeID: ref(''),
            Menus: ref([]),
        }
    },
    mounted() {
        
    },
    methods: {
        createProduct() {
            let vm = this
            let data = {
                name: vm.Name,
                code: parseInt(vm.Code),
                code_id: parseInt(vm.CodeID),
                description: vm.Description
            }
            // console.log(data)
            vm.$api.post('/products', data)
                .then((ress) => {
                    if(ress.status == 200) {
                        vm.$q.notify({
                            message: 'Product has been cretaed!',
                            color: 'positive'
                        })
                    } else {
                        vm.$q.notify({
                            message: 'Product cant be created!',
                            color: 'negative'
                        })
                    }

                    vm.Name = ''
                    vm.Code = ''
                    vm.CodeID = ''
                    vm.Description = ''
                })
                .catch((err) => console.log(err))
        },
    }
})
</script>
