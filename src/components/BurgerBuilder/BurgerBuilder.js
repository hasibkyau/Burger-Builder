import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import Summary from './Summary/Summary';

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 90,
}
export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'cheese', amount: 0 },
            { type: 'meat', amount: 0 },
        ],
        totalPrice: 80,
        modalOpen: false,
        purchasable: false,
    }

    addIngredientHandle = type => {
        const ingredients = [...this.state.ingredients];
        for (let item of ingredients) {
            if (item.type === type) {
                if (item.amount < 5) {
                    item.amount++;
                    this.state.totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
                    this.state.purchasable = true;
                }
            };
        }
        this.setState({ingredients: ingredients});
        this.updatePurchasable(ingredients);
    }

    removeIngredientHandle = type => {
        const ingredients = [...this.state.ingredients];

        for (let item of ingredients) {
            if (item.type === type) {
                if (item.amount != 0) {
                    item.amount--;
                    this.state.totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
                    this.state.purchasable = true;
                }
            }
        }
        this.setState({ingredients: ingredients });
        this.updatePurchasable(ingredients);
    }

    toggleModal = () =>{
        this.setState({
            modalOpen : !this.state.modalOpen,
        })
    }

    updatePurchasable = ingredient =>{
        const sum = ingredient.reduce((sum, element) => {
            return sum + element.amount;
        }, 0);
        this.setState({
            purchasable: sum > 0
        })
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.state.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemove={this.removeIngredientHandle}
                        totalPrice={this.state.totalPrice}
                        toggleModal = {this.toggleModal}
                        purchasable = {this.state.purchasable}
                    />
                </div>

                <Modal isOpen = {this.state.modalOpen}>
                    <ModalHeader>Your Order Sumumary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.state.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredients = {this.state.ingredients}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='success' onClick={this.toggleModal}>Continue to checkout</Button>
                        <Button color = 'secondary' onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}