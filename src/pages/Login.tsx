import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLoader from '../components/AuthLoader';
import { handleLogin } from '../controllers';

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) {
      navigate('/');
      return;
    }
    if (!sessionStorage.getItem('verifier')) {
      navigate('/');
      return;
    }

    handleLogin(code)
      .then(() => navigate('/'))
      .catch(() => {
        navigate('/');
      });
  }, [navigate]);
  return <AuthLoader />;
};

export default Login;
