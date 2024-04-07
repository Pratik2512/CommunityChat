import "./AuthPage.css";
import logo from "../../assets/images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import useSignup from "../../Hooks/useSignup";
import useLogin from "../../Hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [pass, setPass] = useState();
  const [email, setEmail] = useState();
  const [uname, setUname] = useState();
  const [error, setError] = useState();

  const { signup, loading: su_loading, error: su_error, signupwithgoogle } = useSignup();
  const { login, loading: lo_loading, error: lo_error } = useLogin();
  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    else {
      if (su_error) setError(su_error);
      if (lo_error) setError(lo_error);
    }
  }, [user, su_error, lo_error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      login({ pass, email });
    } else {
      signup({ uname, pass, email });
    }

    e.target.reset();
  };

  const brandingVariant = {
    hide: {
      opacity: 0
    },
    show: {
      opacity: 1
    }
  }

  const formVariant = {
    hide: {
      y: "-100px",
      opacity: 0
    },
    show: {
      y: 0,
      opacity: [0, 0.8, 1],
    }
  }

  const circleVariant = {
    circle: {
      rotate: 270,
      borderRadius: "50%",
    },
    square: {
      rotate: -225,
      borderRadius: "10%"
    }
  }

  const pageVariant = {
    hide: {
      x: "100vw",
      transition: {
        type: "spring", duration: 0.5, ease: "easeInOut"
      }
    },
    show: {
      x: 0,
      transition: {
        type: "spring", duration: 0.5, ease: "easeInOut"
      }
    },
    exit: {
      x: "100vw",
      transition: {
        type: "spring", duration: 0.5, ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div className="authpage" variants={pageVariant}
      initial='hide' animate='show' exit='exit'>

      <motion.div className="branding" variants={brandingVariant} initial="hide" animate="show">
        <img src={logo} alt="" />
        <h1>CollabCraze</h1>
      </motion.div>

      <div className="authcontain">
        <div className="auth_form_contain">
          <motion.div className="auth_form" variants={formVariant} initial="hide" animate="show">
            <h3 className="form_title">Welcome {isLogin ? `Back` : ``}</h3>
            <h4 className="form_subtitle">
              {isLogin
                ? `Welcome Back! Please enter your details`
                : `Let's get you all set up.`}
            </h4>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <p className="field_title">Email</p>
              <input
                className="input_field"
                type="text"
                placeholder="Enter your email"
                onChange={(e) => {
                  e.target.value.trim() !== "" &&
                    setEmail(e.target.value.trim());
                }}
              />
              <p className="field_title">Password</p>
              <input
                className="input_field"
                type="password"
                placeholder="Your Password"
                onChange={(e) => {
                  e.target.value.trim() !== "" &&
                    setPass(e.target.value.trim());
                }}
              />
              {!isLogin && (
                <motion.div variants={formVariant} initial='hide' animate='show' className="uname_contain">
                  <p className="field_title">Username</p>
                  <input
                    className="input_field"
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => {
                      e.target.value.trim() !== "" &&
                        setUname(e.target.value.trim());
                    }}
                  />
                </motion.div>
              )}
              {error && <p className="error_msg">{error.message}</p>}
              <button
                type="submit"

                className="form_button submit"
              >
                {su_loading || lo_loading ? <lottie-player src="https://assets4.lottiefiles.com/private_files/lf30_06kvvo5n.json" background="transparent" speed="1" style={{ width: "30px", height: "30px" }} loop autoplay></lottie-player> : isLogin ? `Sign in` : `Sign up`}
              </button>
              <button className="form_button google_submit" onClick={signupwithgoogle}>
                <FcGoogle style={{ fontSize: "20px" }}></FcGoogle>Sign{" "}
                {isLogin ? `in` : `up`} with Google
              </button>
              <div className="form_toogle">
                <p>
                  {isLogin
                    ? `Don't have an account?`
                    : `Already have an account?`}
                </p>
                <p
                  className="link"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                  }}
                >
                  {isLogin ? `Sign up` : `Sign in`}
                </p>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="illustration_contain">
          <motion.div className="circle" variants={circleVariant} animate={isLogin ? 'circls' : 'square'} transition={{ type: "spring", duration: 1, ease: "easeInOut" }}></motion.div>
          <div className="normal"></div>
          <div className="blur"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthPage;
