import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from "../firebase/config";
import MyButton from "../components/UI/my-buttons/MyButton";
import { contextData } from "../context/logic";
import Cookie from "universal-cookie";
const cookie = new Cookie();

function Login() {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(contextData);

  const [eye, setEye] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  });

  const handleSignIn = () => {
    signInWithEmailAndPassword(authFirebase, login, password)
      .then((userCredential) => {
        cookie.set("auth-token", userCredential.user.uid);
        setIsAuth(true);
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          setErrorMessage("Wrong email");
        } else if (err.code === "auth/missing-password") {
          setErrorMessage("Password is missing");
        } else if (err.code === "auth/invalid-credential") {
          setErrorMessage("Email or password is incorrect");
        } else {
          setErrorMessage(err.code);
        }
      });
  };

  return (
    <div className="w-full h-[800px] flex justify-center items-center">
      <section className="w-[350px] h-[400px] flex flex-col items-center bg-white rounded-lg">
        <h2 className="w-full text-center text-3xl font-Alumni border-b-2 border-black">
          Log In
        </h2>
        <div className="flex flex-col gap-2 items-center mt-[50px]">
          <input
            className="bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-md"
            type="email"
            placeholder="Email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <div className="relative">
            <input
              className=" bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-md"
              type={eye ? "text" : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setEye(eye ? false : true)}
            >
              <img src="img/eye.png" alt="eye" width={25} height={25} />
            </span>
          </div>
          <span className="py-2">
            <Link to="/register">
              <small>Don't have account yet? Register</small>
            </Link>
          </span>
          <div
            onClick={() => {
              handleSignIn();
            }}
            className="w-full flex"
          >
            <MyButton className="w-full border border-[#3758c5] text-md">
              Войти
            </MyButton>
          </div>
          <strong className="text-red-500 font-semibold">
            {<p>{errorMessage}</p>}
          </strong>
        </div>
      </section>
    </div>
  );
}

export default Login;
