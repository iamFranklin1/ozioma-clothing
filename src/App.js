import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './components/pages/homepage/homepage.component';
import ShopPage from './components/pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot} from 'firebase/firestore';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      const userRef = await createUserProfileDocument(userAuth);

       if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
       
        // Listen for updates to the user document
        this.unsubscribeFromSnapshot = onSnapshot(userRef, (snapShot) => {
              setCurrentUser({
                id: snapShot.id,
              ...snapShot.data()
            });
          });
        } 
      
      else {
        setCurrentUser(userAuth);
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
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={ this.props.currentUser? (
            <Navigate to ='/'/>
          ) :(<SignInAndSignUpPage/>
            )
          }
          />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = ({user}) =>({
  currentUser :user.currentUser
})

const mapDispatchToProps = dispatch =>({
 setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);