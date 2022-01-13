import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
 
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            alias: "/animals",
            name: 'animals',
            component: () => import("./components/AnimalList")
        },
        {
            path: '/animals/:id',
            name: 'animal-details',
            component: () => import("./components/Animal")
        },
        {
            path: '/add-animal',
            name: 'add-animal',
            component: () => import("./components/AnimalAdd")
        },
        {
            path: '/users',
            name: 'users',
            component: () => import("./components/UserList")
        },
        {
            path: '/users/:id',
            name: 'user-details',
            component: () => import("./components/User")
        },
        {
            path: '/add-user',
            name: 'add-user',
            component: () => import("./components/UserAdd")
        }
    ]
});
