import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import AuthRequiredModal from '@/components/AuthRequiredModal';

function RequireAuth({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <>
        {children}
        <AuthRequiredModal from={location} onClose={() => navigate('/')} />
      </>
    );
  }

  return children;
}

export default RequireAuth;
