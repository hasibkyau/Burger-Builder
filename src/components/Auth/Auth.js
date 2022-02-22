import React, { Component } from "react";
import { Formik } from "formik";

class Auth extends Component {
    state = {
        mode: "sign up",
    }

    switchModeHandler = () => {
        this.setState({
            mode: this.state.mode === "sign up" ? "login" : "sign up"
        })
    }
    render() {
        return (
            <div>
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            passwordConfirm: ""
                        }
                    }
                    onSubmit={
                        (values) => {
                            console.log(values);
                        }
                    }
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (values.password.length < 4) {
                            errors.password = 'Must be atleast 4 characters!';
                        }
                        if (this.state.mode === "sign up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required';
                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = 'Password field does no match!';
                            }
                        }
                        //console.log("Errors:", errors)
                        return errors;
                    }}
                >

                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div style={{
                            border: "1px gray solid",
                            padding: "15px",
                            borderRadius: "5px",

                        }}>
                            <button style={{
                                width: "100%",
                                backgroundColor: "#D70F64",
                                color: "white"
                            }}
                                className="btn btn-lg"
                                onClick={this.switchModeHandler}
                            >Switch to {this.state.mode === "sign up" ? "login" : "sign up"}</button>
                            <br />
                            <br />
                            <form onSubmit={handleSubmit}>
                                <input name="email" placeholder="Enter your Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>{errors.email}</span>
                                <br />
                                <input name="password" placeholder="Enter your Password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>{errors.password}</span>
                                <br />
                                {this.state.mode === "sign up" ?
                                    <div>
                                        <input name="passwordConfirm" placeholder="Confirm Password"
                                            className="form-control"
                                            value={values.passwordConfirm}
                                            onChange={handleChange}
                                        />
                                        <span style={{ color: "red" }}>{errors.passwordConfirm}</span>
                                        <br />
                                    </div> : null}

                                <button type="submit" className="btn btn-success">{this.state.mode === "sign up" ? "sign up" : "login"}</button>
                                <br />
                            </form>
                        </div>)}

                </Formik>
            </div>
        );
    }
}

export default Auth;