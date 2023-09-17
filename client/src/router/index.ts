import { createRouter, createWebHistory } from "vue-router";
import Login from '@/pages/login.vue'
import Register from '@/pages/register.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router;