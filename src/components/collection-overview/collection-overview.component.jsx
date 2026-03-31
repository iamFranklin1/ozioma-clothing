import React from 'react';

import { useSelector } from 'react-redux';

import { selectCollectionForPreview} from '../../redux/shop/shop.selectors';

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collection-overview.styles.css';

const CollectionOverview = ()=>{
    const collections =
     useSelector(selectCollectionForPreview)
   
        return(
           <div className="collection-overview">
            {collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))}
           </div> 
        )
}

export default CollectionOverview;