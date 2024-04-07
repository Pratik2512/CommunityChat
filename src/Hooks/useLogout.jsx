import { useEffect, useState } from "react";
import { auth } from "../Firebase/config";
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { user, setUser } = useAuthContext(null);
  const [error, setError] = useState(null);
  const [cancelled, isCancelled] = useState(false);

  useEffect(() => {
    return () => {
      isCancelled(true);
    };
  }, []);
  const logout = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      setError(e);
    }
  };

  return { logout, error };
};

export default useLogout;
