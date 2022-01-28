<template>
  <q-layout view="lHh LpR lFf" class="tw-bg-gray-100 tw-font-['Poppins']">
    <q-header reveal class="tw-bg-white tw-text-blue-800 tw-shadow-sm">
      <q-toolbar class="tw-flex tw-justify-between tw-bg-white tw-py-4 tw-px-5">
        <q-btn dense flat round icon="eva-menu-2-outline" class="tw-text-blue-800" @click="toggleLeftDrawer" />

        <div class="tw-flex tw-items-center">
            <q-btn flat class="md:tw-hidden tw-block tw-bg-white tw-py-2 tw-px-3 tw-font-bold">AF</q-btn>
            <q-btn flat no-caps class="tw-flex tw-flex-col md:tw-block tw-hidden">
                <q-icon name="eva-person-outline" size="18px"/>
                <div class="tw-ml-1 tw-mr-4">Hikmal MR</div>
                <q-icon name="eva-arrow-ios-downward-outline" size="18px"/>
            </q-btn>

            <q-menu>
                <q-list flat class="tw-font-['Poppins']" style="min-width: 150px">
                    <q-item clickable v-ripple>
                        <q-item-section>Profile</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>Settings</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-ripple @click="logout">
                        <q-item-section>Logout</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </div>

        <!-- <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title> -->

        
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" :width="280" bordered >
      <!-- drawer content -->
      <div class="tw-flex tw-flex-row">
        <div class="tw-px-5">
          <img src="logo.jpeg" alt="" :width="120">
        </div>
        <!-- <div class="tw-flex tw-items-center">
          <p>Dashboard HC</p>
        </div> -->
      </div>
      <SideMenu 
        v-for="link in essentialLinks"
        :key="link.title"
        v-bind="link"
        @click="miniState"
      >
      </SideMenu>
      <q-list class="tw-space-y-2">
        <q-item
          clickable
          v-ripple
          class="tw-flex tw-items-center tw-p-1 tw-px-4 tw-text-red-600 tw-transition-colors dark:tw-text-light hover:tw-bg-gray-50 dark:hover:bg-primary"
          @click="confirmLogout"
        >
          <q-item-section avatar>
            <q-icon class="tw-text-red-600" name="eva-power-outline" />
          </q-item-section>
          <q-item-section class="tw-text-sm tw-text-red-600"
            >Logout</q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="Confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar>
              <q-icon name="eva-power-outline" class="tw-text-4xl tw-text-red-600"></q-icon>
            </q-avatar>
            <span class="q-ml-sm">Are sure you want to logout?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Yes" color="negative" @click="logout()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    
  </q-layout>
</template>

<script>
import { ref } from "vue";

import SideMenu from 'components/EssentialMenu.vue'

const linksList = [
    {
        MenuTitle: "Dashboard",
        MenuIcon: "eva-home-outline",
        Url: "/home"
    },
    {
        MenuTitle: "Management",
        MenuIcon: "eva-clipboard-outline",
        Url: "/managements",
        MenuChild: [
          {
            MenuTitle: "Menu",
            Url: "/menu"
          },
          {
            MenuTitle: "User",
            Url: "/user"
          }
        ]
    },
    {
        MenuTitle: "Setting",
        MenuIcon: "eva-settings-outline",
        Url: "/setting",
        MenuChild: [
          {
            MenuTitle: "Role",
            Url: "/role"
          },
          {
            MenuTitle: "Permission",
            Url: "/permission"
          }
        ]
    },
    {
      MenuTitle: "Logout",
      MenuIcon: "eva-log-out-outline",
      Url: "/login",
    },
    
]

export default {
    components: {
        SideMenu
    },
  setup() {
    const leftDrawerOpen = ref(false);
    const miniStateOpen = ref(true)

    return {
      Confirm: ref(false),
      essentialLinks: ref([]),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      miniState() {
        miniStateOpen.value = !miniStateOpen.value
      }
    };
  },
  mounted() {
    this.getMenus()
  },
  methods: {
    logout() {
      let self = this
      sessionStorage.removeItem('token')
      self.$router.push({ name: 'Login' })

    },

    getMenus() {
      let vm = this

      vm.$api.get('/menus')
        .then((ress) => {
          vm.essentialLinks = ress.data.data
          console.log(vm.essentialLinks)
        })
        .catch((err) => console.log(err));
    },

    confirmLogout() {
      this.Confirm = true
    }
  }
};
</script>
