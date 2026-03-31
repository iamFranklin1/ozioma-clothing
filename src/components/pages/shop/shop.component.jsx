import React from 'react';

import {Routes, Route , useMatch} from "react-router-dom";
import CollectionOverview from "./../../collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

const ShopPage =()=>{
    const match =useMatch('/shop/*');
    console.log(match);

    return (
    <div className="shop-page">
        <Routes>
            <Route index element={<CollectionOverview/>}/>
            <Route path=':collectionId' element={<CollectionPage/>}/>
    </Routes>
</div>
    );
};

export default ShopPage;