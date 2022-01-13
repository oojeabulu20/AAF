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
        }
    ]
});
