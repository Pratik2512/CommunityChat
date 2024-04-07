import React, { useEffect, useState, Suspense } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../../Components/Header/Header";
import useNotifReciever from "../../Hooks/useNotifReciever";
import { motion } from "framer-motion";

const LeftPanel = React.lazy(() => import("../../Components/LeftPanel/LeftPanel"));
const RightPanel = React.lazy(() => import("../../Components/RightPanel/RightPanel"));

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const { ObserveLastMsg, ObserveLastOpn } = useNotifReciever();

  useEffect(() => {
    !user && navigate("/authpage");
  }, [user]);

  useEffect(() => {
    ObserveLastMsg();
    ObserveLastOpn();
  }, [])

  const pageVariant = {
    hide: {
      x: "-100vw",
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
      x: "-100vw",
      transition: {
        type: "spring", duration: 0.5, ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div className="home"
      variants={pageVariant} initial='hide' animate='show'
      exit='exit'>

      <Header user={user} />
    
      <Suspense fallback={<div></div>}>
        <LeftPanel showChat={showChat} setShowChat={setShowChat} />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <RightPanel showChat={showChat} setShowChat={setShowChat} />
      </Suspense>

    </motion.div>
  );
};
export default Home;
