import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import './App.css';
import HomePage from './components/pages/homepage/homepage.component';
import ShopPage from './components/pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot} from 'firebase/firestore';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }
 
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      const userRef = await createUserProfileDocument(userAuth);

       if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
       
        // Listen for updates to the user document
        this.unsubscribeFromSnapshot = onSnapshot(userRef, (snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () =>{console.log(this.state);} 
        );
          
        });
      } 
      
      else {
        this.setState({ currentUser: userAuth});
      }
  });
    }

  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
    if (this.unsubscribeFromSnapshot) {
      this.unsubscribeFromSnapshot();
    }
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;