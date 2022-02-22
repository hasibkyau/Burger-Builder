import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { Modal, ModalBody } from "reactstrap";
import { resetIngredients } from "../../../Redux/actionCreators";
import { Formik} from "formik";

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }

}

class Checkout extends Component {
    state = {
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }

    submitHandler = (customer) => {
        this.setState({
            isLoading: true,
        })
        const order = {
            ingredients: this.props.ingredients,
            customer: customer,
            price: this.props.totalPrice,
            orderTime: new Date()
        }
        axios.post("https://burger-builder-723e2-default-rtdb.firebaseio.com/orders.json", order)
            .then(response => {
               
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Placed Successfully!",
                })
                this.props.resetIngredients();
            })
            
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Check your internet connection and try again",
                })
            })
         console.log(order);
    }
    render() {
        let form = <div>
            <h4 style={{
                border: "1px solid gray",
                boxShadow: "1px 1px #888888",
                borderRadious: "5px",
                padding: "20px"
            }}> Payment: {this.props.totalPrice} BDT </h4>

            <Formik
                initialValues={
                    {
                        name: "",
                        email: "",
                        phone: "",
                        deliveryAddress: "",
                        paymentType: "",
                    }

                }

                onSubmit={
                    (values) => {
                        this.submitHandler(values);
                        console.log(values);
                    }
                }

                validate={(values) => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }

                    if (!values.phone) {
                        errors.phone = 'Required';
                    } else if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(values.phone)) {
                        errors.phone = "Invalid phone number";
                    }

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.deliveryAddress) {
                        errors.deliveryAddress = 'Required';
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
                        <form onSubmit={handleSubmit}>

                            <input name="name" placeholder="Enter your Name"
                                className="form-control"
                                value={values.name}
                                onChange={handleChange}
                            />
                            <span style={{ color: "red" }}>{errors.name}</span>
                            <br />

                            <input name="phone" placeholder="Enter your Phone Number"
                                className="form-control"
                                value={values.phone}
                                onChange={handleChange}
                            />
                            <span style={{ color: "red" }}>{errors.phone}</span>
                            <br />

                            <input name="email" placeholder="Enter your Email"
                                className="form-control"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <span style={{ color: "red" }}>{errors.email}</span>
                            <br />

                            <input name="deliveryAddress" placeholder="Enter your address"
                                className="form-control"
                                value={values.deliveryAddress}
                                onChange={handleChange}
                            />
                            <span style={{ color: "red" }}>{errors.deliveryAddress}</span>
                            <br />

                            <select
                                name="paymentType"
                                className="form-control"
                                value={values.paymentType}
                                onChange={handleChange}
                            >
                                <option value="Cash On Delivery">Cash On Delivery</option>
                                <option value="bKash">Bkash</option>
                            </select>

                            <br />
                            <button type="submit" className="btn btn-danger">Submit</button>
                            <Link to="/" className="btn btn-secondary m-1">Cancel</Link>
                           <br />

                        </form>
                    </div>)}

            </Formik>
        </div>
        return (

            <div>
                {this.state.isLoading ? <Spinner /> : form}

                <Modal isOpen={this.state.isModalOpen}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                        <Link className="btn btn-danger" to="/" >Close</Link>
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);