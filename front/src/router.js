import { createRouter, createWebHistory } from 'vue-router';
import LogClient from '@/components/LogClient.vue';
import HomePage from '@/components/HomePage.vue';
import Calendrier from '@/components/Calendrier.vue';

const routes = [
  { path: '/', name: 'Login', component: LogClient },
  { path: '/home', name: 'Home', component: HomePage },
  { path: '/calendrier', name: 'Calendrier', component: Calendrier },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
