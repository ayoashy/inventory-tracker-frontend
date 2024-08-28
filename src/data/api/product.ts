import { apiCall } from "./auth";

export const addProductApi = async (post: any) => apiCall<any>('post', 'product/add-product', post, true);

export const getProductApi = async () => apiCall<any>('get', 'product/get-product', undefined, true);

export const getUserProductApi = async () => apiCall<any>('get', 'product/user/product', undefined, true);

export const editProductApi = async (id: string, post: any) => apiCall<any>('put', `product/edit-product/${id}`, post, true);

export const deleteProductApi = async (id: string) => apiCall<any>('delete', `product/delete-product/${id}`, undefined, true);
