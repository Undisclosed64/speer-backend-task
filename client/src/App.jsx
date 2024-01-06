import "./App.css";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-brightWhite flex">
      <Sidebar />
      <div className="flex-grow flex-shrink-0 ml-16">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
