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

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="admin/add-employee" element={<AddEmployee/>}/>
          </Route>
      </Routes>
    </>
  )
}

export default App
