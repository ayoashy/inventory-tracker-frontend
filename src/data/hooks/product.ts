import { useMutation, useQuery, useQueryClient } from "react-query";
import { addProductApi, deleteProductApi, editProductApi, getProductsApi, getUserProductsApi } from "../api/product";

export const useAddProductApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['product, user-product']);
    },
  });
};


export const useGetProductApi = () => {
  return useQuery({
    queryKey: ['product, user-product'],
    queryFn: getProductsApi,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetUserProductApi = () => {
  return useQuery({
    queryKey: ['user-product, product'],
    queryFn: getUserProductsApi,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// Edit Product Hook
export const useEditProductApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, post }: { id: string; post: any }) => editProductApi(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries(['product, user-product']);
    },
  });
};

// Delete Product Hook
export const useDeleteProductApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string; }) =>
      deleteProductApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['product, user-product']);
    },
  });
};


