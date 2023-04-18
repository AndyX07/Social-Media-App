import React from 'react'
import TextareaAutosize from "react-textarea-autosize"
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import { setDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './lib/firebase';
import {uuidv4} from '@firebase/util';
import { useAuth } from './hooks/auth';
import OnePost from './OnePost';
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';

const Post = () => {
  const {register, handleSubmit, reset} = useForm();
  const {user, isLoading:loading} = useAuth();
  function handlePost (e){
    addPost({
      poster: user.id,
      text: e.text
    })
    reset();
  }

  const[isLoading, setLoading] = useState(false);

  async function addPost(p){
    setLoading(true);
    const tempID = uuidv4();
    await setDoc(doc(db, "posts", tempID), {
      ...p,
      id: tempID,
      date: Date.now(),
      likes: [],
      dislikes: [],
      comments: []
    })
  }

  const q = query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, postsLoading, error] = useCollectionData(q);


  return (
    <div className = "Post">
        <form className = "PostForm" onSubmit = {handleSubmit(handlePost)}>
            <h1>Make a Post</h1>
            <TextareaAutosize
              required
              placeholder = "Post Content"
              minRows = {5}
              {...register("text")}
            />
            <button>
              Post
            </button>
        </form>
        <OnePost posts = {posts}/>
    </div>
  )
}

export function usePost(id){
  const qu = doc(db, "posts", id);
  const [post, isLoading] = useDocumentData(qu);
  return {post, isLoading};
}

export default Post