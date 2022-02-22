import React, { Component } from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import { Route, Routes } from 'react-router-dom';
import Auth from './Auth/Auth';
import { connect } from 'react-redux';
import { authCheck } from '../Redux/authActionCreator';

const mapDispatchToProps = dispatch =>{
    return{
        authCheck: () => dispatch(authCheck()),
    }
}

const mapStateToprops = state => {
    return {
        token: state.token,
    }
}
class Main extends Component{
    componentDidMount(){
        this.props.authCheck();
    }
    render(){
    let routes = null;
    if (this.props.token === null) {
        routes = <Routes>
            <Route path='/login' element={<Auth />} />
        </Routes>
    } else {
        routes = <Routes>
            <Route path='/orders' element={<Orders />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/' element={<BurgerBuilder />}></Route>
        </Routes>
    }
    return (
        <div>
            <Header />
            <div className="container">
                {routes}
            </div>
        </div>
    )
}
}

export default connect(mapStateToprops, mapDispatchToProps)(Main);