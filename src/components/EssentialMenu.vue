<template>
  <q-list class="tw-space-y-2" v-if="Childs.length == 0">
    <q-item
      clickable
      v-ripple
      class="
        tw-flex
        tw-items-center
        tw-p-1
        tw-px-4
        tw-text-gray-500
        tw-transition-colors
        dark:tw-text-light
        hover:tw-bg-gray-50
        dark:hover:bg-primary
      "
     :to="Url" 
     @click="dataLink(Name)"
     :active="menuActive === Name" active-class="tw-bg-indigo-100"
    >
      <q-item-section avatar>
        <q-icon color="gray-8" :name="Icon"/>
      </q-item-section>
      <q-item-section class="tw-text-sm">{{ Name }}</q-item-section>
    </q-item>

  </q-list>
  <q-list v-else class="tw-space-y-2">
    <q-expansion-item group="expand" :label="Name" :icon="Icon" @click="handleClick" class="tw-text-gray-500 tw-transition-colors tw-rounded-md" :active="menuActive === Childs.Name" active-class="tw-bg-indigo-50">
      <ul class="tw-ml-16 tw-text-sm">
        <li v-for="child in Childs" :key="child.Url" @click="dataLink(child.Name)" class="tw-px-2 tw-py-3">
          <router-link :to="Url + child.Url">{{ child.Name }}</router-link>
        </li>
      </ul>
    </q-expansion-item>
  </q-list>
</template>

<script>
import { defineComponent, ref } from "vue";


export default defineComponent({
    name: 'SideMenu',
  setup() {
    return {
      menuActive: ref(null)
    };
  },
  props: {
      Name: {
          type: String,
          required: true
      },
      Icon: {
        type: String,
        default: ''
      },
      Url: {
        type: String,
        default: '#'
      },
      Childs: {
        type: Array,
        default: [] 
      }
  },
  mouted() {
    this.getMenus()
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
    dataLink(data) {
      this.menuActive = data
    },

    getMenus() {
      let vm = this

      vm.$api.get('/menus')
        .then((ress) => console.log(ress.data.data))
        .catch((err) => console.log(err));
    }
  }
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
