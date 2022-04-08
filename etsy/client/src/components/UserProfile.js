import React from 'react';
import EditIcon from '@material-ui/icons/Edit';


function UserProfile() {
  return (
    <div className="userprofile">
         <div>
           <img className="userprofile_image" src="" alt="" />
           <EditIcon className="userprofile_editIcon"/>
         </div>
         User Profile Page
    </div>
  )
}

export default UserProfile