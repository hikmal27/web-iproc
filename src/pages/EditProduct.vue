<template>
    <q-page>
        <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
            <h1 class="tw-text-2xl tw-font-semibold ">Detail Product</h1>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'edit-product',
    setup() {
        return {

        }
    },
    mounted() {
        this.getDetailProduct()
    },
    methods: {
        getDetailProduct() {
            let vm = this

            vm.$api.get('/products/' + vm.$route.params.id)
                .then((ress) => {
                    console.log(ress)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
})
</script>
