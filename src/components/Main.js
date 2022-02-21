import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import { Route, Routes} from 'react-router-dom';

const Main = props => {
    return (
        <div>
            <Header />
            <div className="container">
                <Routes>
                    <Route path='/orders' element = {<Orders/>}></Route>
                    <Route path='/checkout' element={<Checkout />}></Route>
                    <Route path='/' element={<BurgerBuilder />}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Main;