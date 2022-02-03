const requireAuth = (to, from, next) => {
  let id = sessionStorage.getItem('access_token')
  if(id === null) {
    next('/login')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/dashboard.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/home', component: () => import('pages/home.vue'), name: 'Home' },
      { path: '/foods', component: () => import('pages/foods.vue') },
      { path: '/forms', component: () => import('pages/forms.vue') },

      // Menus
      { path: '/managements/menu', component: () => import('pages/Menu.vue'), name: 'menu' },
      { path: '/managements/menu/create', component: () => import('pages/CreateMenu.vue'), name: 'create-menu' },
      { path: '/managements/menu/:id', component: () => import('pages/DetailMenu.vue'), name: 'detail-menu' },

      // Users
      { path: '/managements/user', component: () => import('pages/User.vue'), name: 'user'},
      { path: '/managements/user/create', component: () => import('pages/CreateUser.vue'), name: 'create-user' },
      { path: '/managements/user/:id', component: () => import('pages/DetailUser.vue'), name: 'detail-user' },

      // Roles
      { path: '/setting/role', component: () => import('pages/Role.vue'), name: 'role' },
      { path: '/setting/role/create', component: () => import('pages/CreateRole.vue'), name: 'create-role' },
      { path: '/setting/role/:id', component: () => import('pages/EditRole.vue'), name: 'edit-role' },

      // Permissions
      { path: '/setting/permission', component: () => import('pages/Permission.vue'), name: 'permission' },
      { path: '/setting/permission/create', component: () => import('pages/CreatePermission.vue'), name: 'create-permission' },
      { path: '/setting/permissions/:id', component: () => import('pages/DetailPermission.vue'), name: 'detail-permission' },
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
