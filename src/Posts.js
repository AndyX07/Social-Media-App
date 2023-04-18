import React from 'react'
import ProfilePicture from './ProfilePicture';
import { arrayUnion, doc, query, updateDoc, arrayRemove, deleteDoc, where, collection, getDoc, getDocs} from 'firebase/firestore';
import { db } from './lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import {formatDistanceToNow} from 'date-fns';
import {AiOutlineLike, AiFillLike} from 'react-icons/ai';
import { useAuth } from './hooks/auth';
import {BiComment} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { PROTECTED } from './lib/routes';
import {BsFillTrashFill} from 'react-icons/bs';
import { GetComments } from './lib/Comments';

const Posts = ({post}, {key}) => {
    const {text, poster, likes} = post;
    const qu = query(doc(db, "users", poster));
    const [user, isLoading] = useDocumentData(qu);
    const {user:currentUser, isLoading: userLoading} = useAuth();
    const liked = likes.includes(currentUser?.id);
    const {comment, isLoading:commentLoading} = GetComments(post.id);
    const handleLike = () =>{
        async function likePost(){
            const ref = doc(db, "posts", post.id);
            await updateDoc(ref, {
                likes: liked? arrayRemove(currentUser.id) : arrayUnion(currentUser.id)
            })
        }
        likePost();
    }
    async function handleDelete(){
        const qu = query(collection(db, "comments"), where("postID", "==", post.id));
        const temp = await getDocs(qu);
        temp.forEach(async (t) => await deleteDoc(t.ref));
        await deleteDoc(doc(db, "posts", post.id));
    }
  return (
    <div className = "Posts">
        <div className='postContainer'>
            <ProfilePicture user = {user}/>
            <p>@{user?.username}</p>
        </div>
        <div className = "time">
            <p>{formatDistanceToNow(post.date)} ago</p>
        </div>
        <p>{text}</p>

        <div className = "actions">
            <div className = "like">
                {!liked? (<AiOutlineLike size = "25px" onClick = {handleLike}/>) : (<AiFillLike size = "25px" onClick={handleLike}/>)}
            </div>
            <p>{likes.length}</p>
            <div className = "comment">
                <Link to = {`${PROTECTED}/${post.id}/comments`} style = {{color:"black"}}>
                    <BiComment size = "25px"/>
                </Link>
            </div>
            <p>{comment?.length}</p>
            <div className = "delete">
                {poster == currentUser?.id?
                (<button onClick = {handleDelete}>
                    <BsFillTrashFill size = "25px"
                    onMouseOver={({target})=>target.style.color="red"}
                    onMouseOut={({target})=>target.style.color="black"}/>
                </button>) : (<></>)}
            </div>
        </div>

    </div>
  )
}

export default Posts