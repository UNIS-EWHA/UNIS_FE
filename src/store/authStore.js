import { create } from 'zustand';

const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  role: localStorage.getItem('role'),
  isLoggedIn: !!localStorage.getItem('accessToken'),
  setAuth: ({ accessToken, role }) => {
    localStorage.setItem('accessToken', accessToken);
    if (role) localStorage.setItem('role', role);
    set({ accessToken, role: role ?? null, isLoggedIn: true });
  },
  clearAuth: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    set({ accessToken: null, role: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
