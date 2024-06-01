import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authFirebase, provider } from "../firebase/config";
import { contextData } from "../context/logic";
import MyButton from "../components/UI/my-buttons/MyButton";
import Cookie from "universal-cookie";
import GoogleIcon from "../components/UI/my-icons/GoogleIcon";
const cookie = new Cookie();

function Register() {
  const { setIsAuth } = useContext(contextData);
  const [eye, setEye] = useState<boolean>(true);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordSecond, setPasswordSecond] = useState<string>("");
  const navigate = useNavigate();

  const check = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordSecond || password.length === 0) {
      setErrorMessage("Passwords are not matching");
    } else {
      handleSignUp();
    }
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authFirebase, login, password)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          setErrorMessage("Почта неправильная!");
        } else if (err.code === "auth/missing-password") {
          setErrorMessage("Неправильный пароль!");
        } else if (err.code === "auth/weak-password") {
          setErrorMessage("Слабый пароль!");
        } else if (err.code === "auth/email-already-in-use") {
          setErrorMessage("Эта почта уже используется");
        } else {
          setErrorMessage(err.code);
        }
      });
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(authFirebase, provider);
      cookie.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="w-full h-[800px] flex justify-center items-center">
        <section className="w-[350px] min-h-[450px] flex flex-col items-center bg-white rounded-lg">
          <h2 className="w-full text-center text-3xl font-Alumni border-b-2 border-black">
            Sign Up
          </h2>
          <div className="flex flex-col gap-2 items-center mt-[50px]">
            <form className="flex flex-col gap-2" onSubmit={check}>
              <input
                className="bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-md"
                type="email"
                placeholder="Email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <div className="relative">
                <input
                  className="bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-md"
                  type={eye ? "password" : "text"}
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
              <div className="relative">
                <input
                  className="bg-[#aaaaaa] rounded w-[260px] h-[40px] ps-4 placeholder-black font-Alumni text-md"
                  type={eye ? "password" : "text"}
                  placeholder="Repeat password"
                  value={passwordSecond}
                  onChange={(e) => setPasswordSecond(e.target.value)}
                />
                <span
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => setEye(eye ? false : true)}
                >
                  <img src="img/eye.png" alt="eye" width={25} height={25} />
                </span>
              </div>
              <span className="text-center py-2">
                <Link to="/login">
                  <small>Do you have account? Sign In</small>
                </Link>
              </span>
              <div className="w-full flex flex-col gap-2">
                <span>
                  <MyButton
                    type="submit"
                    className="w-full border border-[#3758c5] hover:text-white"
                  >
                    Sign Up
                  </MyButton>
                </span>
                <span onClick={() => signInWithGoogle()}>
                  <MyButton className="flex justify-center items-center gap-3 text-md w-full border border-[#000] hover:bg-[#fff]">
                    <GoogleIcon />
                    Sign Up With Google
                  </MyButton>
                </span>
              </div>
            </form>
            <strong className="text-red-500 font-semibold">
              {<p className="py-4">{errorMessage}</p>}
            </strong>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;
