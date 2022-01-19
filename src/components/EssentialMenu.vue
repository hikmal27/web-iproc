<template>
  <q-list class="tw-space-y-2" v-if="MenuChild.length == 0">
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
     @click="dataLink(MenuTitle)"
     :active="menuActive === MenuTitle" active-class="tw-bg-indigo-100"
    >
      <q-item-section avatar>
        <q-icon color="gray-8" :name="MenuIcon"/>
      </q-item-section>
      <q-item-section class="tw-text-sm">{{ MenuTitle }}</q-item-section>
    </q-item>

  </q-list>
  <q-list v-else class="tw-space-y-2">
    <q-expansion-item group="expand" :label="MenuTitle" :icon="MenuIcon" @click="handleClick" class="tw-text-gray-500 tw-transition-colors tw-rounded-md" :active="menuActive === MenuChild.MenuTitle" active-class="tw-bg-indigo-50">
      <ul class="tw-ml-16 tw-text-sm">
        <li v-for="child in MenuChild" :key="child.Url" @click="dataLink(child.MenuTitle)" class="tw-px-2 tw-py-3">
          <router-link :to="Url + child.Url">{{ child.MenuTitle }}</router-link>
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
      MenuTitle: {
          type: String,
          required: true
      },
      MenuIcon: {
        type: String,
        default: ''
      },
      Url: {
        type: String,
        default: '#'
      },
      MenuChild: {
        type: Array,
        default: [] 
      }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
    dataLink(data) {
      this.menuActive = data
    }
  }
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
