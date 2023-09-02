import { client } from '../utils/axios-utils';

const url = `https://dummyjson.com`;

const productsService =  {
    getProducts: () => {
        return new Promise((resolve, reject) => {
            return  client()
            .get(`${url}/products`)
            .then(res => resolve(res.data))
            .catch(error=> reject(error))
        })
    }
}
export default  productsService;