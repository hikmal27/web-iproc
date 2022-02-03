<template>
  <div
    class=" 
      tw-flex
      tw-flex-col
      tw-items-center
      tw-justify-center
      tw-min-h-screen
      tw-p-4
      tw-space-y-4
      tw-antialiased
      tw-text-gray-900
      tw-bg-gray-100
      dark:tw-bg-dark dark:tw-text-light
      tw-font-['Poppins']
    "
  >
    <!-- <router-link 
        class="
        tw-inline-block
        tw-mb-6
        tw-text-3xl
        tw-font-bold
        tw-tracking-wider
        tw-uppercase
        tw-text-primary-dark
        dark:tw-text-light
      "
      to="/"
      >
      K-WD
    </router-link> -->

      <div
        class="
          tw-w-full tw-max-w-sm tw-px-4
      
          tw-py-4
          tw-space-y-6 tw-bg-white tw-rounded-md
          dark:tw-bg-darker
        "
      >
        <h1 class="tw-text-xl tw-font-semibold tw-text-center">Login</h1>
        <form @submit.prevent="login">
          <q-input
            outlined 
            label="Username"
            type="text"
            v-model="username"
          >
            <template v-slot:prepend>
              <q-icon name="eva-people-outline" />
            </template>
          </q-input>
          <q-input
            outlined 
            class="tw-mt-5"
            :type="isPwd ? 'password' : 'text'"
            label="Password"
            v-model="password"
          >
              <template v-slot:prepend>
                <q-icon :name="isPwd ? 'eva-eye-outline' : 'eva-eye-off-outline'" @click="isPwd = !isPwd" />
              </template>
          </q-input>
          <div>
              <q-btn label="Submit" type="submit" class="tw-w-full tw-px-4 tw-py-2 tw-font-medium tw-text-center tw-text-white tw-transition-colors tw-duration-200 tw-rounded-md tw-bg-teal-700 hover:tw-bg-teal-800 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary focus:tw-ring-offset-1 dark:focus:tw-ring-offset-darker tw-mt-3"/>
          </div>
        </form>
        <div class="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400">
          Don't have an account yet? <router-link to="/" class="tw-text-blue-600 hover:tw-underline">Register</router-link>
        </div>
      </div>
  </div>
</template>

<script>
import { ref } from "vue";
  const accept = ref(false)

export default {
  name: "login",
  setup() {
      return {
          accept,
          username: ref(''),
          password: ref(''),
          isPwd: ref(true)
      }
  },
  methods: {
    login() {
      let data = {
        username: this.username,
        password: this.password
      }

      let self = this

      this.$api.post('/login', data)
        .then(function(response) {
          // console.log(response.data.access_token)
          if (response.status == 200) {
            sessionStorage.setItem('access_token', response.data.access_token)
            self.$router.push({ name: 'Home' })
          } else {
            console.log('Silahkan coba lagi!!')
          }
        })
        .catch(function(error) {
          console.log(error)
        })

    },
  }
};
</script>
