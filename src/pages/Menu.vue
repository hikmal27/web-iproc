<template>
  <q-page>
      <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
        <h1 class="tw-text-2xl tw-font-semibold ">Menu</h1>
      </div>

      <div class="tw-w-48 tw-mt-2 tw-p-4">
        <router-link to="/managements/menu/create">
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
                    <div class="tw-font-semibold tw-text-left">Name</div>
                  </th>
                  <th class="tw-p-2 tw-whitespace-nowrap">
                    <div class="tw-font-semibold tw-text-left">Url</div>
                  </th>
                  <th class="tw-p-2 tw-whitespace-nowrap">
                    <div class="tw-font-semibold tw-text-left">Icon</div>
                  </th>
                  <th class="tw-p-2 tw-whitespace-nowrap">
                    <div class="tw-font-semibold tw-text-left">Order</div>
                  </th>
                  <th class="tw-p-2 tw-whitespace-nowrap">
                    <div class="tw-font-semibold tw-text-left">Childs</div>
                  </th>
                  <th class="tw-p-2 tw-whitespace-nowrap">
                    <div class="tw-font-semibold tw-text-left">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody class="tw-text-sm tw-divide-y tw-divide-gray-100">
                <tr v-for="menu in Menus" :key="menu.ID" class="tw-text-gray-700">
                  <td class="tw-p-2 tw-whitespace-nowrap">
                    <div class="tw-flex tw-items-center">
                      <div class="tw-font-medium tw-text-gray-800">{{ menu.Name }}</div>
                    </div>
                  </td>
                  <td class="tw-p-2 tw-whitespace-nowrap">
                    <div class="tw-flex tw-items-center">
                      <div class="tw-font-medium tw-text-gray-800">{{ menu.Url }}</div>
                    </div>
                  </td>
                  <td class="tw-p-2 tw-whitespace-nowrap">
                    <div class="tw-flex tw-items-center">
                      <div class="tw-font-medium tw-text-gray-800">{{ menu.Icon }}</div>
                    </div>
                  </td>
                  <td class="tw-p-2 tw-whitespace-nowrap">
                    <div class="tw-flex tw-items-center">
                      <div class="tw-font-medium tw-text-gray-800">{{ menu.Order }}</div>
                    </div>
                  </td>
                  <td class="tw-p-2 tw-whitespace-nowrap">
                    <div v-if="menu.Childs.length > 0" class="tw-flex tw-items-center">
                      <q-badge v-for="child in menu.Childs" :key="child" rounded color="primary" :label="child.Name" />
                    </div>
                    <div v-else class="tw-flex tw-items-center">
                      <div class="tw-font-medium tw-text-gray-800">-</div>
                    </div>
                  </td>
                  <td class="tw-p-2 tw-space-x-2">
                    <router-link :to="'/managements/menu/' + menu.ID" class="tw-text-base tw-text-yellow-500"><q-icon name="eva-edit-outline"></q-icon></router-link>
                    <button class="tw-text-base tw-text-red-700" @click="confirmDelete(menu.ID)"><q-icon name="eva-trash-2-outline"></q-icon></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <q-dialog v-model="Confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar>
              <q-icon name="eva-trash-2-outline" class="tw-text-4xl tw-text-red-600"></q-icon>
            </q-avatar>
            <span class="q-ml-sm">You are sure you want to delete it?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Yes" color="negative" @click="deleteMenu()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'menus',
  setup() {
    return {
      Menus: ref([]),
      Confirm: ref(false),
      Id: ref(null),
      Childs: ref([])
    }
  },
  mounted() {
    this.getMenus()
  },
  methods: {
    getMenus() {
      let self = this

      self.$api.get('/menus')
        .then(ress => {
          // console.log(ress.data.data[0].Childs)
          let item = ress.data.data
          self.Menus = item
          item.forEach(data => {
            self.Childs.push([data.Childs])
          })
          console.log(self.Childs)
        })
        .catch(err => console.log(err));
    },

    confirmDelete(id) {
      this.Confirm = true
      this.Id = id
    },

    deleteMenu() {
      let self = this

      self.$api.delete('/menus/' + self.Id + '/force')
        .then(ress => {
          console.log("Menu has been deleted!", ress)
          if(ress.status == 200) {
            self.$q.notify({
              message: 'Menu has been deleted!',
              color: 'negative'
            })
          } else {
            self.$q.notify({
              message: 'Menu cant be deleted!',
              color: 'negative'
            })
          }
          self.Confirm = false
          self.getMenus()
        })
        .catch(err => console.log(err))
    },

    getChilds(menu) {
      let data = menu.Childs.length
                  ? menu.Childs.map((item) => {
                    // `<q-badge rounded color="primary" label="`+ item.Name +`" />`
                    item.Name
                  })
                  : '-'
      return data
    }
  }
})
</script>