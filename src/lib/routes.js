import {createBrowserRouter} from 'react-router-dom';

import Login from "../Login";
import Layout from "../layout";
import Post from "../Post";
import Comments from './Comments';
import UserProfile from '../UserProfile';
import ProfileUpload from '../ProfileUpload';

export const LOGIN = "/login";

export const PROTECTED = "/protected";
export const HOMEPAGE = "/protected/home";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/:id/comments";
export const UPLOAD = "/protected/:id/upload";

export const router = createBrowserRouter([
    {path: LOGIN, element : <Login />},
    {path: PROTECTED, element: <Layout />, children: [
        {path: HOMEPAGE, element: <Post/>},
        {path: PROFILE, element: <UserProfile/>},
        {path: COMMENTS, element: <Comments/>},
        {path: UPLOAD, element: <ProfileUpload/>}
    ]}
])