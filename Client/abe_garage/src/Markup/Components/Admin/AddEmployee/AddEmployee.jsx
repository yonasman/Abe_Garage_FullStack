import { useState } from "react";
import employeeService from "../../../../Services/employee.service"


function AddEmployeeForm() {
  // variables to store user info state
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [employeeRole, setEmployeeRole] = useState(2)
    const [password, setPassword] = useState("")
    const [activeEmployee, setActiveEmployee] = useState(1)
    // variable for storing errors
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [firstNameRequired, setFirstNameRequired] = useState("")
    const [lastNameRequired, setLastNameRequired] = useState("")
    const [serverError, setServerError] = useState("")
    // variable for success
    const [success, setSuccess] = useState("")
    // function to handle form submission
    function handleSubmit(e) {
      // prevent default submission
      e.preventDefault();
      // flag to handle validation
      let valid = true;
      // handle first name
      if(!firstName) {
        setFirstNameRequired("First name is required")
        valid = false
      } else {
        setFirstNameRequired("")
      }
      // handle last name
      if(!lastName) {
        setLastNameRequired("Last name required")
        valid = false
      } else {
        setLastNameRequired("")
      }
      // handle password
      if(!password || password.length < 6) {
        setPasswordError("Password must be greater than 6 characters")
        valid = false
      } else {
        setPasswordError("")
      }
      // handle email
      const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if(!emailRegEx.test(email)) {
        setEmailError("Invalid Email")
        valid = false
      } else {
        setEmailError("")
      }
      if(valid) {
        // form data to send to server
      const formData = {
        email,
        firstName,
        lastName,
        phone,
        employeeRole,
        password,
        activeEmployee
      }  // send data to the employee service to send the data to server
      employeeService.submit(formData).then((result) => {
        if (result.status === "failed") {
          setServerError(result.message);
        } else {
          setSuccess(result.message)
          setServerError("")
          setTimeout(() => {
            window.location.href="/"
          }, 2000);
        }
      }).catch((error) => {
        console.log("Error", error);
        setServerError("An error occurred. Please try again.");
      });
    }}
    return (
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Add a new employee <span>__</span></h2>
          </div>
          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
                  {/* form starts */}
                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                      <div className="form-group col-md-12">
                        {success && <div className="success-msg">{success}</div>}
                        {serverError && <div className="validation-error">{serverError}</div>}
                        {emailError && <div className="validation-error">{emailError}</div>}
                        <input type="email" name="employee_email" placeholder="Employee email" value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                      <div className="form-group col-md-12">
                        {firstNameRequired && <div className="validation-error">{firstNameRequired}</div>}
                        <input type="text" name="employee_first_name" placeholder="Employee first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                      </div>
  
                      <div className="form-group col-md-12">
                        {lastNameRequired && <div className="validation-error">{lastNameRequired}</div>}
                        <input type="text" name="employee_last_name" placeholder="Employee last name"  value={lastName} onChange={e => setLastName(e.target.value)}/>
                      </div>
  
                      <div className="form-group col-md-12">
                        <input type="text" name="employee_phone" placeholder="Employee phone (555-555-5555)" required  value={phone} onChange={e => setPhone(e.target.value)}/>
                      </div>
  
                      <div className="form-group col-md-12">
                        <select name="employee_role" className="custom-select-box" value={employeeRole} onChange={e => setEmployeeRole(e.target.value)}>
                          <option value="1">Employee</option>
                          <option value="2">Manager</option>
                          <option value="3">Admin</option>
                        </select>
                      </div>
  
                      <div className="form-group col-md-12">
                        {passwordError && <div className="validation-error">{passwordError}</div>}
                        <input type="password" name="employee_password" placeholder="Employee password" value={password} onChange={e => setPassword(e.target.value)}/>
                      </div>
  
                      <div className="form-group col-md-12">
                        <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add employee</span></button>
                      </div>
                    </div>
                  </form>
                  {/* form ends */}
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
  }
  
  export default AddEmployeeForm;
  