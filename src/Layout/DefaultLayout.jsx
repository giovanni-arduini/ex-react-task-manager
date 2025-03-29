import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="container m-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default DefaultLayout;
