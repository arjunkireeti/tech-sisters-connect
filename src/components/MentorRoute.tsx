
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

export default function MentorRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isMentor, setIsMentor] = useState<boolean | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkMentorStatus = async () => {
      if (!user) {
        setIsMentor(false);
        setCheckingRole(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking mentor status:', error);
          setIsMentor(false);
        } else {
          setIsMentor(data.user_type === 'mentor');
        }
      } catch (error) {
        console.error('Error:', error);
        setIsMentor(false);
      } finally {
        setCheckingRole(false);
      }
    };

    checkMentorStatus();
  }, [user]);

  if (loading || checkingRole) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (!isMentor) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
