import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login.vue')
    },
    {
      path: '/diary',
      name: 'diary',
      component: () => import('@/views/diary/DiaryHome')
    },
    {
      path: '/creating-diary',
      name: 'creating-diary',
      component: () => import('@/views/diary/CreatingDiary')
    },
    {
      path: '/diary-detail',
      name: 'diary-detail',
      component: () => import('@/views/diary/DiaryDetail')
    }
  ]
});
