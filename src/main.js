import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Items from './views/Items.vue';
import ItemsDetail from './views/ItemsDetail.vue';
import AddEditItem from './views/AddEditItem';
import Users from './views/Users.vue';
const routes = [
  { path: '/', component: Items },
  { path: '/detail/:id', component: ItemsDetail },
  { path: '/add', component: AddEditItem },
  { path: '/edit/:id', component: AddEditItem },
  { path: '/users', component: Users },
];
const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
createApp(App).use(router).mount('#app');
