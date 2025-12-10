import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../domain/UseCases/authCases/useAuth';

const useAuthGuard = (isAuthenticated: boolean) => {
    const navigate = useNavigate();
    const { checkAuthFromJWT } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated) {
                if (!await checkAuthFromJWT()) {
                    navigate('/');
                }
            }
        };
        checkAuth();
    }, [isAuthenticated, navigate]);
};

export default useAuthGuard; 