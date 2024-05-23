import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar/SideBar";
import CreateQuiz from "../createQuiz/CreateQuiz";
import { useContext } from "react";
import { formContext } from "../../context/FormProvider";
import UseAuth from "../../services/hooks/UseAuth";
const Home = () => {
  const isLoggedIn = UseAuth();
  console.log(isLoggedIn);
  const { showForm, setForm } = useContext(formContext);
  return (
    isLoggedIn && (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Outlet />
        {showForm > 0 && <CreateQuiz />}
      </div>
    )
  );
};

export default Home;
