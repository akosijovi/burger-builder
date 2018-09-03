import axios from 'axios';

const orders = axios.create({
    baseURL: 'https://react-my-burger-c5227.firebaseio.com'
});

export default orders;
