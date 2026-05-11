import React from 'react';
import {Routes, Route , useMatch} from "react-router-dom";
import {connect} from 'react-redux';

import CollectionOverview from "./../../collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

import { collection, onSnapshot } from 'firebase/firestore';
import {db, convertCollectionsSnapshotToMap} from '../../../firebase/firebase.utils'

import WithSpinner from '../../with-spinner/with-spinner.component';

import {updateCollections} from '../../../redux/shop/shop.actions'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner =WithSpinner(CollectionPage)

class  ShopPage extends React.Component{
   state ={
    loading: true
   };

  unsubscribeFromSnapshot = null;

 componentDidMount(){
    const { updateCollections } = this.props;
 const collectionRef = collection(db,'collections');

 this.unsubsribeFromSnapshot = onSnapshot(collectionRef, (snapshot) =>{
   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
   updateCollections(collectionsMap);
   this.setState({ loading:false });
 });
 }
render(){
    const {loading} = this.state;

    return (
    <div className="shop-page">
        <Routes>
            <Route index element={<CollectionOverviewWithSpinner isLoading={loading}/>}/>
            <Route path=':collectionId' element={<CollectionPageWithSpinner isLoading={loading}/>}/>
    </Routes>
</div>
    );
}};
    
const mapDispatchToProps = dispatch =>({
 updateCollections: collectionsMap =>
     dispatch(updateCollections(collectionsMap))
})

export default connect(
    null,
    mapDispatchToProps
  )(ShopPage);