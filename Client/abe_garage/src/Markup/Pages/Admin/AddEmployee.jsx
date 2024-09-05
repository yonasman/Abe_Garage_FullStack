import AddEmployeeForm from "../../Components/Admin/AddEmployee/AddEmployee"
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu"
import "../../../assets/styles/addEmployee.css"

function AddEmployee() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
              <AdminMenu/>
          </div>
          <div className="col-md-9 admin-right-side">
              <AddEmployeeForm/>
          </div>
        </div>
      </div>
    </>
  )
}
export default AddEmployee