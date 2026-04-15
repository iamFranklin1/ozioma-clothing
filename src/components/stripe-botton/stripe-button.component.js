import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price})=>{
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_51THPFL0cjOWG18FUg4pius0dBiEUdYTxeHOOlrKDzmyheq4HpQebFRTnTht2ccGzMFiHsgCuVGPI8BH1PfTPfCi100RI0PBx1q"


  const onToken = token =>{
    alert('Payment Successful');
  }

 return (
  <StripeCheckout
  label='Pay Now'
  name='Ozioma clothing Ltd.'
  billingAddress
  shippingAddress
  image='//https://svgshare.com/i/CUz.svg'
  description={`Your total is $${price}`}
  amount ={priceForStripe}
  panelLabel='Pay Now'
  token ={onToken}
  stripeKey={publishableKey}
  />
 );
};

export default StripeCheckoutButton;