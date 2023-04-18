import React from 'react'
import {Link} from 'react-router-dom';
import { useAuth } from './hooks/auth';
import { PROTECTED } from './lib/routes';
import ProfilePicture from './ProfilePicture';

function ActiveUser(){
    const {user, isLoading} = useAuth();

    if(isLoading) return "loading...";

    return (
        <ul className = "sidebarContainer">
            <li className = "profile">
                <ProfilePicture user = {user}/>
                <p>{user.username}</p>
            </li>
            <li>
                <Link to = {`${PROTECTED}/profile/${user?.id}`}>
                    <button>
                        Edit Profile
                    </button>
                </Link>
            </li>
        </ul>
    )
}

const Sidebar = () => {

  return (
    <div className = "sidebar">
        <ActiveUser/>
    </div>
  )
}

export default Sidebar