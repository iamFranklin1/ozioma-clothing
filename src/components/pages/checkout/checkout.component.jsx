import react from "react";
import { useSelector } from "react-redux";

import { selectCartItems, selectcartTotal } from "../../../redux/cart/cart.selectors";
import CheckoutItem from './../checkout-item/checkout-item.component';
import StripeCheckoutButton from "../../stripe-botton/stripe-button.component";
import './checkout.styles.css';

const CheckoutPage = () => {
   const cartItems = useSelector(selectCartItems)
    const total = useSelector(selectcartTotal)

return (

    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
       <span>Product</span>
        </div>
        <div className="header-block">
       <span>Description</span>
        </div>
        <div className="header-block">
       <span>Quantity</span>
        </div>
        <div className="header-block">
       <span>Price</span>
        </div>
        <div className="header-block">
       <span>Remove</span>
        </div>
      </div>  

      {cartItems.map((cartItem)=>(
        <CheckoutItem key={ cartItem.id}cartItem={cartItem}/>
       ))}; 

      <div className="total">TOTAL: ${total}</div>
    <div className="test-warning">
      *Please use the following test credit card for payments*
      <br/>
      4242 4242 4242 4242 -Exp: 01/27 - CW:123
    </div >
        <div className="button">
          <StripeCheckoutButton price={total}/>
        </div>
        </div>
    
)};


export default CheckoutPage;