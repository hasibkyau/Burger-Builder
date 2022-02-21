import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';

export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'cheese', amount: 0 },
            { type: 'meat', amount: 0 },
        ]
    }
    render() {
        return (
            <div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.state.ingredients} />
                <Controls />
            </div>
        )
    }
}