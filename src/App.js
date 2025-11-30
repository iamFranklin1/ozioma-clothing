import React from 'react';
import { Routes,Route } from 'react-router-dom';

import './App.css';

import HomePage from './components/pages/homepage/homepage.component'
import ShopPage from './components/pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth} from './firebase/firebase.utils';
import { onAuthStateChanged } from 'firebase/auth';

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser:null
    };
    
  }
  unsubscribeFromAuth =null

  componentDidMount(){
   this.unsubscribeFromAuth = onAuthStateChanged(auth,user =>{
   this.setState({currentUser:user});

   console.log(user);
  });
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
return (
    <div className="App">
      <Header currentUser = {this.state.currentUser}/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/shop" element={<ShopPage/>}/>
        <Route path='signin' element ={<SignInAndSignUpPage/>}/>
      </Routes>
    </div>
  );
  }
  
}

export default App;
