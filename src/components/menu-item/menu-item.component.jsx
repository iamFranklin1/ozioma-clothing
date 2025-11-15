import React from "react";
import { useNavigate } from "react-router-dom";
import './menu-item.styles.css';



const MenuItem = ({title, imageUrl, size,linkUrl }) =>{
   const navigate =useNavigate();

   const handleClick =()=>{
      navigate (linkUrl);
   };

    return (<div className ={`${size} menu-item`} onClick={handleClick}
     >
         <div className="background-image" 
            style={{ 
           backgroundImage: `url(${imageUrl})`
           }}
         />
               <div className="content">
                  <h1 className="title">{title.toUpperCase()}</h1>
                  <span className="subtitile">SHOP NOW</span>
               </div>
           </div>
           );     
     };

export default MenuItem;