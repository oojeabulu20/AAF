import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});

const vm = new Vue();
const baseURL = 'http://localhost:3050/';

const handleError = fn => (...params) =>
    fn(...params).catch(error => {
        vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
    });

export const api = {
    getpet: handleError(async id => {
        const res = await axios.get(baseURL + "petshop/pets/" + id);
        return res.data;
    }),
    getpets: handleError(async () => {
        const res = await axios.get(baseURL + "petshop/pets/");
        console.log("received data: " + JSON.stringify(res.data) );
        return res.data;
    }),
    deletepet: handleError(async id => {
        const res = await axios.delete(baseURL + "petshop/pets/" + id);
        return res.data;
    }),
    createpet: handleError(async payload => {
        const res = await axios.post(baseURL + "petshop/pets/", payload);
        return res.data;
    }),
    updatepet: handleError(async payload => {
        const res = await axios.put(baseURL + "petshop/pets/" + payload._id, payload);
        return res.data;
    }),
    getuser: handleError(async id => {
        const res = await axios.get(baseURL + "users/users/" + id);
        return res.data;
    }),
    getusers: handleError(async () => {
        const res = await axios.get(baseURL + "users/users/");
        console.log("received data: " + JSON.stringify(res.data) );
        return res.data;
    }),
    deleteuser: handleError(async id => {
        const res = await axios.delete(baseURL + "users/users/" + id);
        return res.data;
    }),
    createuser: handleError(async payload => {
        const res = await axios.post(baseURL + "users/users/", payload);
        return res.data;
    }),
    updateuser: handleError(async payload => {
        const res = await axios.put(baseURL + "users/users/" + payload._id, payload);
        return res.data;
    })
};
