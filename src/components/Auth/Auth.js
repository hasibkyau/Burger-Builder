import React, { Component } from "react";
import { Formik } from "formik";

class Auth extends Component {
    render() {
        return (
            <div>
                <Formik
                    initialValues={
                        {
                            email : "",
                            password : "",
                            passwordConfirm : ""
                        }
                    }
                    onSubmit = {
                        (values) =>{
                            console.log(values);
                        }
                    }
                >
                    
                    {({values, handleChange, handleSubmit})=>(<div>
                        <form onSubmit={handleSubmit}>
                            <input name="email" placeholder="Enter your Email"
                            className="form-control"
                            value={values.email}
                            onChange = {handleChange}
                            />
                            <br/>
                            <input name="password" placeholder="Enter your Password"
                            className="form-control"
                            value={values.password}
                            onChange = {handleChange}
                            />
                            <br/>
                            <input name="passwordConfirm" placeholder="Confirm Password"
                            className="form-control"
                            value={values.passwordConfirm}
                            onChange = {handleChange}
                            />
                            <button type="submit" className="btn btn-success">Submit</button>
                            <br/>
                        </form>
                    </div>)}

                </Formik>
            </div>
        );
    }
}

export default Auth;