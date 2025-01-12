import { createRouter, createWebHistory } from 'vue-router';
import LogClient from '@/components/LogClient.vue';
import HomePage from '@/components/HomePage.vue';

const routes = [
  { path: '/', name: 'Login', component: LogClient },
  { path: '/home', name: 'Home', component: HomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
