import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const ProtectedRoute = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/auth/verify', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Not authenticated');
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  
  if (!data) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;