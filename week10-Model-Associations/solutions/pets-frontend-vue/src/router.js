import Vue from 'vue';
import Router from 'vue-router';
import NewPet from './views/NewPet.vue'
import ListPets from './views/ListPets.vue';

Vue.use(Router);
 
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: '/pets'
        },
        {
            path: '/pets',
            name: 'pets',
            component: ListPets
        },
        {
            path: '/pets/new',
            name: 'new-pet',
            component: NewPet
        }
    ]
});
