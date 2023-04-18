import React from 'react'
import {Link} from 'react-router-dom';
import { PROTECTED } from './lib/routes';

const ProfilePicture = ({user}) => {
    if(!user) return "loading...";
  return (
    <Link to = {`${PROTECTED}/profile/${user?.id}`}>
        <img src = {user.avatar}/>
    </Link>
  )
}

export default ProfilePicture