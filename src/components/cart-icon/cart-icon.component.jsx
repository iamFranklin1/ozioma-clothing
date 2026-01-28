import React from "react";

import { connect } from "react-redux";

import {ReactComponent as ShoppingIcon} from '../../assests/122 shopping-bag.svg';

import { toggleCartHidden } from "../../redux/cart/cart.action";

import './cart-icon.styles.css';

const CartIcon = ({toggleCartHidden}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon"/>
      <span className="item-count">0</span>
    </div>
);

const mapDispatchToProps = dispatch =>({
  toggleCartHidden :() => dispatch(toggleCartHidden())
})

export default connect(
    null,
    mapDispatchToProps
)(CartIcon);