import React, { useEffect, useState } from "react";
import { Logo, cheesecake } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { buttonClcik } from "../animations";
import { FcGoogle } from "react-icons/fc";
import { app } from "../config/firebase.config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { validateUserJWTToken } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../context/actions/userActions";
import { alertInfo, alertWarning } from "../context/actions/alertActions";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_pasword, setConfirm_pasword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    // it to maintain the state of the login with user crediantials
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const LoginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };
  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_pasword === "") {
      dispatch(alertInfo("Required Field Should Not be Empty"));
    } else {
      if (password === confirm_pasword) {
        setUserEmail("");
        setConfirm_pasword("");
        setPassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        dispatch(alertWarning("Password doesn't match"));
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Password doesn't match"));
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/*background image*/}
      <img
        src={cheesecake}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt=""
      />

      {/*content box*/}
      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        {/*top logo*/}
        <div className="flex items-center justify-start gap-4 w-full ">
          <img src={Logo} className="w-28" alt="" />
          {/* <p className="text-headingColor font-semibold text-xl">FOODKART</p> */}
        </div>

        {/*welcome text*/}
        <p className="text-3xl font-semibold text-headingColor">Welcome</p>
        <p className=" text-xl text-textColor -mt-6">
          {isSignup ? "Sign Up" : "Sign in"} with following{" "}
        </p>

        {/*input section*/}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunction={setUserEmail}
            type="Email"
            isSignUp={isSignup}
          />

          <LoginInput
            placeHolder={"Password"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunction={setPassword}
            type="Password"
            isSignUp={isSignup}
          />

          {isSignup && (
            <LoginInput
              placeHolder={"Confirm Password"}
              icon={<FaEnvelope className="text-xl text-textColor" />}
              inputState={confirm_pasword}
              inputStateFunction={setConfirm_pasword}
              type="password"
              isSignUp={isSignup}
            />
          )}

          {!isSignup ? (
            <p>
              Don't have an account:{" "}
              <motion.button
                {...buttonClcik}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignup(true)}
              >
                Create one
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account:{" "}
              <motion.button
                {...buttonClcik}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignup(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          )}

          {/*sign in button section*/}
          {isSignup ? (
            <motion.button
              {...buttonClcik}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              on
              onClick={signUpWithEmailPass}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClcik}
              onClick={signInWithEmailPass}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Sign In
            </motion.button>
          )}
        </div>
        {/*OR seperation*/}

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className=" text-black">OR</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>
        {/*sign in google*/}
        <motion.div
          {...buttonClcik}
          className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl"
          onClick={LoginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">
            Sign-in with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

