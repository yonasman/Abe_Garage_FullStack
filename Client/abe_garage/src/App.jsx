import {Routes,Route} from "react-router-dom"
import Home from "./Markup/Pages/Home"
import Login from "./Markup/Pages/Login"
import AddEmployee from "./Markup/Pages/Admin/AddEmployee"
// template styles
import "./assets/Template_assets/css/color.css"
import "./assets/Template_assets/css/responsive.css"
import "./assets/Template_assets/css/bootstrap.css"
import "./assets/Template_assets/css/style.css"
import Layout from "./Markup/Components/Layout/Layout"
import UnAuthorized from "./Markup/Pages/UnAuthorized"
import Orders from "./Markup/Components/Admin/Orders/Orders"
import Customers from "./Markup/Components/Admin/Customers/Customers"
import PrivateAuthRoute from "./Markup/Components/Auth/PrivateAuthRoute"
import Employees from "./Markup/Pages/Admin/Employees"

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="admin/add-employee" element={
              <PrivateAuthRoute roles={[1]}>
                <AddEmployee/>
              </PrivateAuthRoute>
            }/>
            <Route path="/unauthorized" element={<UnAuthorized/>}/>
            <Route path="/admin/orders" element={
            <PrivateAuthRoute roles={[1,2,3]}>
              {<Orders/>}
            </PrivateAuthRoute>}/>
            <Route path="/admin/employees" element={<Employees/>}/>
            <Route path="/admin/customers" element={
              <PrivateAuthRoute roles={[1,3]}>
                {<Customers/>}
              </PrivateAuthRoute>}/>
          </Route>
      </Routes>
    </>
  )
}

export default App
