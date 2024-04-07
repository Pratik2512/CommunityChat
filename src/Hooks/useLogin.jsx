import { useEffect, useState } from "react";
import { auth } from "../Firebase/config";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  // const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [cancelled, isCancelled] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     isCancelled(true);
  //   };
  // }, []);
  const login = async ({email, pass}) => {
    try {
      setLoading(true);
      const res = await auth.signInWithEmailAndPassword(email, pass);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  return { login, error, loading };
};

export default useLogin;
