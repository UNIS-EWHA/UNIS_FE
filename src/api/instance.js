import axios from 'axios';
import useAuthStore from '@/store/authStore';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const PUBLIC_AUTH_PATHS = [
  '/auth/login',
  '/auth/signup',
  '/auth/reissue',
  '/auth/email/send',
  '/auth/email/verify',
  '/auth/login-id/check',
];

instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const isPublicAuthRequest = PUBLIC_AUTH_PATHS.includes(
      originalRequest?.url
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isPublicAuthRequest
    ) {
      originalRequest._retry = true;
      try {
        const reissueRes = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/reissue`,
          null,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
            },
          }
        );
        const { accessToken, role } = reissueRes.data.data;
        useAuthStore.getState().setAuth({ accessToken, role });
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (reissueError) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
