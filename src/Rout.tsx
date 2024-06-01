import { useContext } from "react";
import { contextData } from "./context/logic";
import LeftMenu from "./components/left-menu/LeftMenu";
import AppRouter from "./AppRouter";

function Rout() {
  const { isAuth } = useContext(contextData);

  return (
    <div className="w-full flex flex-col md:flex-row">
      {isAuth && <LeftMenu />}
      <div className="w-full h-full bg-[#1b1b1b]">
        <AppRouter />
      </div>
    </div>
  );
}

export default Rout;
