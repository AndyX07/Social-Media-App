import React from 'react'
import { usePost } from '../Post'
import { useParams } from 'react-router-dom'
import Posts from '../Posts'
import {useForm} from 'react-hook-form';
import TextareaAutosize from "react-textarea-autosize";
import ProfilePicture from '../ProfilePicture';
import { useAuth } from '../hooks/auth';
import { setDoc, doc, collection, deleteDoc } from 'firebase/firestore';
import {uuidv4} from '@firebase/util';
import { db } from './firebase';
import { orderBy } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import CommentList from './CommentList';

const Comments = () => {
  const {id} = useParams();
  const {post, isLoading} = usePost(id);
  const {register, handleSubmit, reset} = useForm();
  const {user} = useAuth();
  if(isLoading) return "loading...";
  function addComment(d){
    async function add(comment){
      const id = uuidv4();
      const ref = doc(db, "comments", id);
      await setDoc(ref, {...comment, id});
    }
    add({
      text: d.text,
      postID: id,
      date: Date.now(),
      uid: user?.id
    })
    reset();
  }
  return (
    <div className = "comments">
      <Posts post = {post}/>
      <div className = "addComment">
        <ProfilePicture user = {user}/>
        <form onSubmit= {handleSubmit(addComment)}>
            <TextareaAutosize
              required
              placeholder = "Write a Comment"
              minRows = {5}
              {...register("text")}
              className = "postForm"
            />
          <button type = "submit" className = "commentButton">
              Comment
        </button>
        </form>
        </div>
      <CommentList c = {post}/>
    </div>
  )
}

export default Comments

export function GetComments(id){
  const qu = query(collection(db, "comments"), where("postID", "==", id));
  const [comment, isLoading, error] = useCollectionData(qu);
  return {comment, isLoading};
}

export function DeleteComment(id){
  async function deleteCom(){
    const qu = doc(db, "comments", id);
    await deleteDoc(qu);
  }
  return {deleteCom};
}