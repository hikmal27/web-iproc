const requireAuth = (to, from, next) => {
  let token = sessionStorage.getItem('token')
  if(token === null) {
    next('/login')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/dashboard.vue'),
    // beforeEnter: requireAuth,
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/home', component: () => import('pages/home.vue'), name: 'Home' },
      { path: '/foods', component: () => import('pages/foods.vue') },
      { path: '/forms', component: () => import('pages/forms.vue') },
      { path: '/managements/menu', component: () => import('pages/Menu.vue'), name: 'menu' },
      { path: '/managements/user', component: () => import('pages/User.vue'), name: 'user'},
      { path: '/setting/role', component: () => import('pages/Role.vue'), name: 'role' },
      { path: '/setting/permission', component: () => import('pages/Permission.vue'), name: 'permission' }
    ]
  },
  { path: '/login', component: () => import('pages/login.vue'), name: 'Login' },
  { path: '/foods', component: () => import('pages/foods.vue') },
  { path: '/dashboard', component: () => import('src/layouts/dashboard.vue') },
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
