import {
  getAuthenticatedApi,
  unauthenticatedApi,
} from '../../helpers/axiosAPI';

type RegisterPostType = {
  name: string | undefined;
  password: string | undefined;
  email: string | undefined;
};

export type LoginPostType = Omit<RegisterPostType, 'name'>;
type ForgetPasswordPostType = Pick<RegisterPostType, 'email'>;
type ResetPasswordType = {
  resetToken: string | undefined;
  password: string | undefined;
};

export type UpdatePasswordType = {
  currentPassword: string | undefined;
  newPassword: string | undefined;
};

// Generic error handler
export const handleApiError = (error: any): never => {
  if ( error.message === 'Network Error') {
    throw new Error('Network Error');
  }
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else if (error.response) {
      throw new Error('An error occurred with the response');
    } else {
      throw new Error(error.message || 'An unknown error occurred');
    }
};

// Generic API call function
export const apiCall = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  authenticated: boolean = false,
): Promise<T> => {
  try {
    const api = authenticated ? getAuthenticatedApi() : unauthenticatedApi;
    const response = await api[method](url, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const registerApi = (post: RegisterPostType) =>
  apiCall<any>('post', 'auth/register', post);

const loginApi = (post: LoginPostType) =>
  apiCall<any>('post', 'auth/login', post);

const forgetPasswordApi = (post: ForgetPasswordPostType) =>
  apiCall<any>('put', 'auth/forgotPassword', post);

const resetPasswordApi = ({ resetToken, password }: ResetPasswordType) =>
  apiCall<any>('put', `auth/resetPassword/${resetToken}`, { password });

export const updatePasswordApi = ({
  currentPassword,
  newPassword,
}: UpdatePasswordType) =>
  apiCall<any>('put', `auth/updatePassword`, { currentPassword, newPassword },true);

const getUserApi = () => apiCall<any>('get', 'auth/get-user', undefined, true);

export {
  registerApi,
  loginApi,
  getUserApi,
  forgetPasswordApi,
  resetPasswordApi,
};
