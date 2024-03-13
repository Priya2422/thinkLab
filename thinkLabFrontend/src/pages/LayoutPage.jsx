import { Outlet } from "react-router-dom";
import MainNav from "../components/Navbar";

const LayoutPage = () => {
  return (
    <main
      style={{
        width: "100%",
      }}
    >
      <MainNav />
      <Outlet />
    </main>
  );
};

export default LayoutPage;
