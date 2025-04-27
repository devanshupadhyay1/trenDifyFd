import  { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedAdminRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const role = session.user.user_metadata?.role;
        setIsAdmin(role === "admin");
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-10">Checking access...</div>;

  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedAdminRoute;