import { useContext, useEffect } from "react";
import { contextData } from "../../context/logic";
import { useNavigate } from "react-router";

function MainPage() {
  const {isAuth} = useContext(contextData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  })

  return <div className="w-full h-screen flex"></div>;
}

export default MainPage;
