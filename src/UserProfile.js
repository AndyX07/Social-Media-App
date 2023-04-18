import React from 'react'
import ProfilePicture from './ProfilePicture'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { collection, doc, query, where } from 'firebase/firestore';
import { db } from './lib/firebase';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import Posts from './Posts';
import { format } from 'date-fns';
import { PROTECTED } from './lib/routes';
import { useAuth } from './hooks/auth';

const UserProfile = () => {
  const {id} = useParams();
  const qu = query(collection(db, "posts"), where("poster", "==", id));
  const [posts, isLoading] = useCollectionData(qu);
  const q = query(doc(db, "users", id));
  const [user, userLoading] = useDocumentData(q);
  const navigate = useNavigate();
  const {user: curUser, isLoading: curLoading} = useAuth();
  return (
    <div className = "Profile">
      <div className = "userPicture">
        <ProfilePicture user = {user}/>
        <p>@{user?.username}</p>
        <p>Posts: {posts?.length}</p>
        {!curLoading && !userLoading && curUser.id===user.id? (
          <Link to = {`${PROTECTED}/${user?.id}/upload`}>
            <button>
              Change Profile Picture
            </button>
          </Link>
        ) : 
        (<></>)
        }
      </div>
      <div className = "userPosts">
        <h1>Posts</h1>
        {isLoading? (
          <p>Loading Posts...</p>
        ) : (
          posts.map((p)=><Posts post = {p}/>)
        )}
      </div>
    </div>
  )
}

export default UserProfile