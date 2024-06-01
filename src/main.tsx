import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContextOverAll } from "./context/logic";
import Rout from "./Rout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextOverAll>
    <BrowserRouter>
      <Rout/>
    </BrowserRouter>
  </ContextOverAll>
);
