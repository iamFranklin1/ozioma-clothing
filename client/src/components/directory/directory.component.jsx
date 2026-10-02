import React from 'react';

import { selectDirectorySections } from '../../redux/directory/directory.selector';
import { useSelector } from 'react-redux';
import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.css'

const Directory =()=>{
  const sections =
  useSelector(selectDirectorySections);
  return(
     <div className="directory-menu">
            {sections.map(({id,...otherSectionProps})=>(
              <MenuItem key={id} {...otherSectionProps}/>  
            ))}
           </div>
           );
          }
        
    
export default Directory;