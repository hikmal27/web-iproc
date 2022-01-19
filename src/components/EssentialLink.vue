<template>
  <q-item clickable v-if="child == 0" tag="a" target="_blank" :href="link">
    <q-item-section
      v-if="icon"
      avatar
    >
    <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>

  <q-expansion-item  group="expand" :label="MenuTitle">
    <q-list class="tw-ml-6">
      <ul class="tw-list-none tw-space-y-5 tw-text-sm">
        <li>
          <router-link >{{ MenuChild }}</router-link>
        </li>
      </ul>
    </q-list>
  </q-expansion-item>
  
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    MenuChild: {
      type: Array,
      default: []
    }
  }
})
</script>
