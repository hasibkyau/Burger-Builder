import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        }
    }
    inputChangeHandle = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }

    submitHandler = () => {
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date()
        }
        axios.post("https://burger-builder-723e2-default-rtdb.firebaseio.com/orders.json", order)
        .then(response=>console.log(response))
        .catch(err => console.log(err))
       // console.log(order);
    }
    render() {
        return (
            <div>
                <h4 style={{
                    border: "1px solid gray",
                    boxShadow: "1px 1px #888888",
                    borderRadious: "5px",
                    padding: "20px"
                }}> Payment: {this.props.totalPrice} BDT </h4>

                <form style={{
                    border: "1px solid gray",
                    boxShadow: "1px 1px #888888",
                    borderRadious: "5px",
                    padding: "20px"
                }}>
                    <textarea onChange={(e) => this.inputChangeHandle(e)} className="form-control" placeholder="Your Address" name="deliveryAddress" value={this.state.values.deliveryAddress}></textarea>
                    <br />
                    <input onChange={(e) => this.inputChangeHandle(e)} className="form-control" placeholder="Your Phone Number" name="phone" className="form-control" value={this.state.values.phone}></input>
                    <br />
                    <select onChange={(e) => this.inputChangeHandle(e)} name="paymentType" className="form-control" value={this.state.values.paymentType}>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="bKash">Bkash</option>
                    </select>
                    <br />
                    <Button onClick={this.submitHandler} className="mr-auto" style={{ backgroundColor: "#D70F64" }}>Place Order</Button>
                    <Link to="/" className="btn btn-secondary m-1">Cancel</Link>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Checkout);