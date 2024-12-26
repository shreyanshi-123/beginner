import { Outlet } from "react-router-dom"
import Header from "./Header/header"
import Footer from "./Footer/Footer.jsx"  

const Layout = () => {
  return (
    <>
     <Header />
      <Outlet />
     <Footer />
    </>
  );
}

export default Layout;
