import React from 'react';
import useAuthGuard from '../../hooks/useAuthGuard';
import { useAuth } from '../../domain/UseCases/authCases/useAuth';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    useAuthGuard(isAuthenticated);

    return (
        <>{children}</>
    );
};

export default ProtectedPage; 