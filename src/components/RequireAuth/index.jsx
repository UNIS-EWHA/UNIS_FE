import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import AuthRequiredModal from '@/components/AuthRequiredModal';

function RequireAuth({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <AuthRequiredModal onClose={() => navigate('/')} />;
  }

  return children;
}

export default RequireAuth;
