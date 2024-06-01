import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from "../firebase/config";
import MyButton from "../components/UI/my-buttons/MyButton";

function Register() {
  const [eye, setEye] = useState<boolean>(true);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordSecond, setPasswordSecond] = useState<string>("");
  const navigate = useNavigate();

  const check = () => {
    if (password !== passwordSecond) {
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

  return (
    <div>
      <div className="w-full h-[800px] flex justify-center items-center">
        <section className="w-[350px] min-h-[400px] flex flex-col items-center bg-white rounded-lg">
          <h2 className="w-full text-center text-3xl font-Alumni border-b-2 border-black">
            Register
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
            <span className="py-2">
              <Link to="/login">
                <small>Do you have account? Login</small>
              </Link>
            </span>
            <div onClick={() => check()} className="w-full">
              <MyButton className="w-full border border-[#3758c5] hover:text-white">
                Регистрация
              </MyButton>
            </div>
            <strong className="text-red-500 font-semibold">
              {<p>{errorMessage}</p>}
            </strong>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;
