import React, { use } from 'react'

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import  CollectionItem from '../../collection-item/collection-item.component'

import { selectCollection } from '../../../redux/shop/shop.selectors';

import './collection.styles.css';

const CollectionPage = () =>{
    const {collectionId} =useParams();
    const collection =useSelector(selectCollection(collectionId));

    const {title, items} = collection;
    return(
 <div className='collection'>
 <h2 className='title'>{title}</h2>
 <div className='items'> {items.map(
   item => <CollectionItem key={item.id} item={item}/>
 )}</div>
 </div>
)};

export default CollectionPage;