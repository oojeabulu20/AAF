import Vue from 'vue';
import Router from 'vue-router';
//Pet components
import PetNew from './views/Pet-New.vue'
import PetList from './views/Pet-List.vue';
//User components
import UserNew from './views/User-New.vue';
import UserList from './views/User-List.vue';

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
            component: PetList
        },
        {
            path: '/pets/new',
            name: 'new-pet',
            component: PetNew
        },
        {
            path: '/users',
            name: 'users',
            component: UserList
        },
        {
            path: '/users/new',
            name: 'new-user',
            component: UserNew
        }
    ]
});
