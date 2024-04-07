import { useEffect, useState } from "react";
import { auth, googleProvider } from "../Firebase/config";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async ({ email, pass, uname }) => {
    try {
      setLoading(true);
      
      if(!uname)
      {
        throw new Error("Please Enter a Username");
      }

      let res = await auth.createUserWithEmailAndPassword(email, pass);
      
      if (!res) {
        throw new Error("Could not complete signup");
      }

      await res.user.updateProfile({ displayName: uname });

      setLoading(false);
      setError(null);
      return res.user;
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  const signupwithgoogle = () => {
    try {
      auth
        .signInWithPopup(googleProvider)
        .then((res) => {
          setUser(res.user);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return { loading, error, signup,  signupwithgoogle};
};

export default useSignup;
