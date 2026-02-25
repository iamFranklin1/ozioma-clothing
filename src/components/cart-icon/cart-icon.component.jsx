import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {ReactComponent as ShoppingIcon} from '../../assests/122 shopping-bag.svg';

import { toggleCartHidden } from "../../redux/cart/cart.action";
import { selectCartItemCount } from "../../redux/cart/cart.selectors"; 

import './cart-icon.styles.css';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon"/>
      <span className="item-count">{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch =>({
  toggleCartHidden :() => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemCount
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);