import { Outlet } from "react-router"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
function Layout() {
  return (
    <>
        <Header/>
            <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout
