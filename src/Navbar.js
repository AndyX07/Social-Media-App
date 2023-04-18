import React from 'react'
import {HOMEPAGE} from './lib/routes';
import {Link} from 'react-router-dom';
import { useAuth, useLogout } from './hooks/auth';
import ProfilePicture from './ProfilePicture';

const Navbar = () => {
    const {logOut, isLoading} = useLogout();
    const {user, isLoading: userLoading} = useAuth();
    if(userLoading) return "loading...";
  return (
    <nav className = "navbar">
        <ul className = "navcontainer">
            <li className = "navcontainer">
              <img className = "logo" src = {require('./background/logo.png')}/>
              <Link to = {HOMEPAGE} className = "homeLink">Home</Link></li>
            <li className = "navPicture"><ProfilePicture user = {user}/><button onClick = {logOut} className = "logout">Logout</button></li>
        </ul>
    </nav>
  )
}

export default Navbar