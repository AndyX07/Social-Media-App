import { formatDistanceToNow } from 'date-fns';
import { doc, query } from 'firebase/firestore';
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import ProfilePicture from '../ProfilePicture';
import { db } from './firebase';
import {BsFillTrashFill} from 'react-icons/bs';
import { DeleteComment } from './Comments';
import { useAuth } from '../hooks/auth';

const DisplayComment = ({comment}) => {
    const {text, uid, date, id} = comment;
    const qu = query(doc(db, "users", uid));
    const [user, isLoading] = useDocumentData(qu);
    const {deleteCom} = DeleteComment(id);
    const {user:authUser, isLoading:authLoading} = useAuth();
  return (
    <div className = "display">
        <div className='postContainer'>
            <ProfilePicture user = {user}/>
            <p>@{user?.username}</p>
        </div>
        <div className = "time">
            <p>{formatDistanceToNow(date)} ago</p>
        </div>
        <p>{text}</p>
        {!authLoading && authUser.id===uid ? 
        (<div className = "delete">
            <button onClick = {deleteCom} >
                <BsFillTrashFill size = "25px"
                onMouseOver={({target})=>target.style.color="red"}
                onMouseOut={({target})=>target.style.color="black"}/>
            </button>
        </div>) : (<></>)
        }
    </div>
  )
}

export default DisplayComment