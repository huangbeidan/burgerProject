import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-project-208ec.firebaseio.com/'
});

export default instance;