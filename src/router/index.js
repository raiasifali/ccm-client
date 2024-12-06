import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/layout/layout.vue';
import HomePage from '../views/HomePage.vue';
import Login from '../views/auth/Login.vue';
import SignUp from '../views/organization/SignUp.vue';
import Users from "../views/users/index.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: '/home',
        component: HomePage,
      },
      {
        path: '/users',
        name: '/users',
        component: Users,
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'sign-up',
    path: '/sign-up',
    component: SignUp
  }
];

const router = createRouter({
  history: createWebHistory('#'),
  routes,
});

export default router;
