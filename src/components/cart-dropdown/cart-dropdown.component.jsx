import React from "react";
import { createStructuredSelector } from "reselect";

import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import {  toggleCartHidden } from "../../redux/cart/cart.action";
import CustomButton from '../custom-button/custom-button.component';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import './cart-dropdown.styles.css';




const CartDropdown = () => {

   const cartItems =
   useSelector(selectCartItems);
   const navigate = useNavigate();
   const dispatch = useDispatch();
return(
<div className="cart-dropdown">
    <div className="cart-items">
     {cartItems.length ? (
      cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem}/>
         )) 
     ):(
            <span className="empty-message">your cart is empty</span>
         )}
    </div>

    <CustomButton onClick={() => {navigate
      ('/checkout');
      dispatch(toggleCartHidden ());
   }}
   >Go TO CHECKOUT</CustomButton>
 </div>
);
};



export default  CartDropdown;