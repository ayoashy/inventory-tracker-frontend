import {
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  forgetPasswordApi,
  getUserApi,
  loginApi,
  registerApi,
  resetPasswordApi,
  updatePasswordApi,
} from '../api/auth';

export const useRegisterApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (response)=>{
      if(response && response.token){
localStorage.setItem('invoice-auth-token', response.token);
      }
queryClient.invalidateQueries(['user'])
    }
  });
};
export const useLoginApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      if (response && response.token) {
        localStorage.setItem('invoice-auth-token', response.token);
      }
      queryClient.invalidateQueries(['user']);
    },
  });
};

export const useForgetPasswordApi = () => {``
  return useMutation({
    mutationFn: forgetPasswordApi,
  });
};
export const useResetPasswordApi = () => {
  return useMutation({
    mutationFn: resetPasswordApi,
  });
};

export const useUpdatePasswordApi = () => {
  return useMutation({
    mutationFn: updatePasswordApi,
  });
};

export const useGetUserApi = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
