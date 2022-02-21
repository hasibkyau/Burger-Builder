import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
class Checkout extends Component{
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        }
    }
    inputChangeHandle = (e) =>{
        this.setState({
            values:{
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }

    submitHandler = () =>{
        console.log(this.state.values);
    }
    render(){
    return(
    <div>
        <form style={{
            border: "1px solid gray",
            boxShadow: "1px 1px #888888",
            borderRadious: "5px",
            padding:"20px"
        }}>
            <textarea onChange={(e)=>this.inputChangeHandle(e)} className="form-control" placeholder="Your Address" name="deliveryAddress" value={this.state.values.deliveryAddress}></textarea>
            <br/>
            <input onChange={(e)=>this.inputChangeHandle(e)} className="form-control" placeholder = "Your Phone Number" name="phone" className="form-control" value={this.state.values.phone}></input>
            <br/>
            <select onChange={(e)=>this.inputChangeHandle(e)} name="paymentType" className="form-control" value={this.state.values.paymentType}>
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="bKash">Bkash</option>
            </select>
            <br/>
            <Button onClick={this.submitHandler} className="mr-auto" style={{backgroundColor:"#D70F64"}}>Place Order</Button>
            <Link to="/" className="btn btn-secondary m-1">Cancel</Link>
        </form>
    </div>
    );
}
}

export default Checkout;