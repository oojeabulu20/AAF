import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3050/petshop",
    headers: {
        "Content-type": "application/json"
    }
});